import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import noImage from './noImage.jpg'


export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    componentDidMount = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
        document.title = `${(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)} News - NewsAdda`;
        this.props.setProgress(100);
    }

    prevClick = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
        this.props.setProgress(100);
    }
    nextClick = async () => {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
            loading: false
        })
        this.props.setProgress(100);
    }

    render() {
        return (
            <div className='container my-4'>
                <h3 className='text-info-emphasis'>
                    NewsAdda -
                    <span className='text-danger-emphasis'>Top Headline </span>
                    : <span className='text-info-emphasis text-muted'>
                        {(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)} News
                    </span>
                </h3>
                {this.state.loading && <Loading />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} newsUrl={element.url ? element.url : "/"} img={element.urlToImage ? element.urlToImage : noImage} date={element.publishedAt} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between my-4">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.prevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-info" onClick={this.nextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

News.defaultProps = {
    country: 'in',
    pageSize: 15,
    category: 'general'
};
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
};

export default News
