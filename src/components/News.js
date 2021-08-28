import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    articles = []
    constructor(){
        super();
        console.log("Hello i am a constructor from News componenet");
        this.state = {
         
        }
    }
    render() {
        return (
            <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row">
                    <div className="col-md-4"><NewsItem title="myTitle" description="mydesc" imageURL="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"/></div>
                    <div className="col-md-4"><NewsItem title="myTitle" description="mydesc"/></div>
                    <div className="col-md-4"><NewsItem title="myTitle" description="mydesc"/></div>
                </div>
            </div>
        )
    }
}
