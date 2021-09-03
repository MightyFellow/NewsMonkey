import React, { Component } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      buttonDisabled: false,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  updateNews = async (pageNo) => {
    this.setState({ loading: true });
    this.props.setProgress(40);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(this.state.page);
    this.props.setProgress(70);
    let data = await axios.get(url);
    this.setState({
      articles: data.data.articles,
      totalResults: data.data.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
    this.props.setProgress(0);
    await this.updateNews();
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(this.state.page);
    let data = await axios.get(url);
    this.setState({
      articles: this.state.articles.concat(data.data.articles),
      totalResults: data.data.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((article) => (
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
  }
}
