import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNewsList, deleteNews, updateNews } from '../../../store/actions/newsActions';
import { Link } from 'react-router-dom';

import Loader from '../../loader';
import Error from '../../errorPage';


const News = ({ getNewsList, newsList, loading, error, deleteNews}) => {

    useEffect(() => {
        getNewsList()
    },[getNewsList]);

    if(loading) {
        return <Loader/>
    }

    if(error) {
        return <Error/>
    }
    return (
        <div>
            {
                newsList.length === 0 ?
                <div> There is no any news yet !</div> : 
                newsList.map(news => (
                    <div key={news.id}>
                        <span>{news.title}</span>
                        <button onClick={() => deleteNews(news.id)}>delete</button>
                        <Link 
                            to={{
                                pathname:"/update-news/"+news.id,
                                aboutProps: {
                                    news: news
                                }
                            }}
                        >
                            <button>update</button>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.news.error,
        loading: state.news.loading,
        newsList: state.news.newsList
    }
}

const mapDispatchToState = dispatch => {
    return {
        getNewsList: () => dispatch(getNewsList()),
        deleteNews: (newsId) => dispatch(deleteNews(newsId)),
        updateNews: (newsId) => dispatch(updateNews(newsId))
    }
}

export default connect(mapStateToProps,mapDispatchToState)(News);