import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getNewsList, getTypes } from '../../../store/actions/newsActions';


import Loader from '../../loader';
import Error from '../../errorPage';
import NewsItem from '../newsItem';

import TypesList from '../typesList';

const NewsList = ({ getNewsList, newsList, loading, error, getTypes }) => {
    const [showingNews, setShowingNews] = useState([...newsList]);
    
    useEffect(() => {
        getNewsList();
        getTypes()
    },[getNewsList, getTypes]);

    useEffect(() => {
        setShowingNews(newsList)
    },[JSON.stringify(newsList)]);

    const getFilteredNews = (value) => {
        if(value === 'all') {
            setShowingNews(showingNews)
        }else {
            const filteredNews = showingNews.filter(news => news.typeId == value);
            setShowingNews(filteredNews)
        }
    }

    if(loading) {
        return <Loader/>
    }

    if(error) {
        return <Error/>
    }
    return (
        <div>
            <TypesList getFilteredNews={getFilteredNews}/>
            {
                showingNews.length === 0 ?
                <div> There is no any news yet !</div> : 
                showingNews.map(news => <NewsItem key={news.id} news={news}/>)
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
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps,mapDispatchToState)(NewsList);