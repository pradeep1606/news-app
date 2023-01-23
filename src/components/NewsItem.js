import React from 'react'

const NewsItem =(props)=> {
    let {title, description, img, newsUrl, date} = props;
    return (
        <div className="card my-2 card1" style={{width: "19.5rem"}}>
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text" style={{margin:'0px 0px'}}><small className="text-muted">{new Date(date).toLocaleString()}</small></p>
          <a href={newsUrl} target='_blanck' className="btn btn-sm text-info-emphasis"><strong>Read More...</strong></a>
        </div>
      </div>
    )
}

export default NewsItem
