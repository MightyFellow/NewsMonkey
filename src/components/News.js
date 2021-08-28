import React, { Component } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';

export default class News extends Component {
   
    constructor(){
        super();
        console.log("Hello i am a constructor from News componenet");
        this.state = {
             articles:[],
             loading: false,
             page: 1,
             totalResults:0
        }
    }

    async componentDidMount(){
       let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=641dd0536e3a4af387653e43a884de33&page=1&pageSize=20"
       let data = await axios.get(url)
       this.setState({articles: data.data.articles,totalResults: data.data.totalResults})
    }

     handlePreviousClick = async () => { 
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=641dd0536e3a4af387653e43a884de33&page=${this.state.page - 1}&pageSize=20`
        let data = await axios.get(url)
        this.setState({articles: data.data.articles,page: this.state.page - 1,})
    }

    handleNextClick = async () => {
       const totalNumberOfPages = Math.ceil(this.state.totalResults/20);
       console.log(totalNumberOfPages)
       if(this.state.page + 1 > totalNumberOfPages)
       {
          
       }else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=641dd0536e3a4af387653e43a884de33&page=${this.state.page + 1}&pageSize=20`
        let data = await axios.get(url)
        this.setState({articles: data.data.articles,page: this.state.page + 1,})
       }
    }

    render() {
        return (
            <div className="container my-3">
                <h1>NewsMonkey - Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map(article => <div className="col-md-4"><NewsItem  title={article.title?article.title:""} description={article.description?article.description:""} imageURL={article.urlToImage} newsURL={article.url}/></div>)}
                </div><br />
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
            
        )
    }
}
