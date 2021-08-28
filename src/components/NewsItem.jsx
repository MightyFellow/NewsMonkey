import React, { Component } from 'react'

export default class NewsItem extends Component {
  

    render() {
       const  {title, description, imageURL,newsURL} = this.props;
        return (
            <div>
               <div className="card" style={{width: "18rem"}}>
                  <img src={imageURL?imageURL:"https://img.etimg.com/thumb/msid-85714822,width-1070,height-580,imgsize-21164,overlay-ettech/photo.jpg"} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsURL} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                  </div>
               </div>
            </div>
        )
    }
}
