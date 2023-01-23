import React, {useEffect, useState} from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import noImage from './noImage.jpg'


const News =(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const update = async()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        document.title = `${(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} News - NewsAdda`;
        props.setProgress(100);
    }

    useEffect(()  => {
        update();
        // eslint.disable-next-line
    }, [])
    
    const prevClick = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page - 1}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setPage(page-1);
        setArticles(parseData.articles);
        setLoading(false);
        props.setProgress(100);
    }
    const nextClick = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setPage(page+1);
        setArticles(parseData.articles);
        setLoading(false);
        props.setProgress(100);
    }

        return (
            <div className='container my-4'>
                <h3 className='text-info-emphasis' style={{marginTop:'65px'}}>
                    NewsAdda -
                    <span className='text-danger-emphasis'>Top Headline </span>
                    : <span className='text-info-emphasis text-muted'>
                        {(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} News
                    </span>
                </h3>
                {loading && <Loading />}
                <div className="row">
                    {!loading && articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} newsUrl={element.url ? element.url : "/"} img={element.urlToImage ? element.urlToImage : noImage} date={element.publishedAt} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between my-4">
                    <button disabled={page <= 1} type="button" className="btn btn-info" onClick={prevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-info" onClick={nextClick}>Next &rarr;</button>
                </div>
            </div>

        )
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
