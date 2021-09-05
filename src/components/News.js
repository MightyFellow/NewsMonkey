import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const { country, category, setProgress } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const apiKey = process.env.REACT_APP_API_KEY;
  const pageSize = 5;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;

  const updateNews = async () => {
    setLoading(true);
    setProgress(40);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setProgress(70);
    let data = await axios.get(url);
    setArticles(data.data.articles);
    setTotalResults(data.data.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      setProgress(0);
      await updateNews();
      setProgress(100);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${
      page + 1
    }&pageSize=${pageSize}`;
    setPage(page + 1);
    let data = await axios.get(url);
    setArticles(articles.concat(data.data.articles));
    setTotalResults(data.data.totalResults);
    setLoading(false);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px", marginTop: "90px" }}>
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4">
              <NewsItem
                title={article.title ? article.title : ""}
                description={article.description ? article.description : ""}
                imageURL={article.urlToImage}
                newsURL={article.url}
                author={article.author}
                date={article.publishedAt}
                source={article.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
