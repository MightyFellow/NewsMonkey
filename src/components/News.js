import React, { Component } from "react";
import NewsItem from "./NewsItem";
import axios from "axios";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      buttonDisabled: false,
    };
  }

  updateNews = async (pageNo) => {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=641dd0536e3a4af387653e43a884de33&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await axios.get(url);
    this.setState({
      articles: data.data.articles,
      totalResults: data.data.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
    await this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1, buttonDisabled: false });
    await this.updateNews();
  };

  handleNextClick = async () => {
    const totalNumberOfPages = Math.ceil(
      this.state.totalResults / this.props.pageSize
    );
    if (this.state.page + 1 > totalNumberOfPages) {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ page: this.state.page + 1 });
      await this.updateNews();
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonkey - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((article) => (
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
        <br />
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.buttonDisabled}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
