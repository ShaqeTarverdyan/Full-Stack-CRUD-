import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNewsList, getTypes } from '../../../store/actions/newsActions';


import Loader from '../../loader';
import Error from '../../errorPage';
import NewsItem from '../newsItem';
import { useHistory } from 'react-router-dom';

import TypesList from '../typesList';

const NewsList = ({ getNewsList, loading, error, getTypes, newsList }) => {
    const history = useHistory();
    const historySearch = history.location.search;
    const splitedSearch = historySearch && historySearch.split(/([0-9]+)/);
    const searchValue = splitedSearch && JSON.parse(splitedSearch[1]);

    useEffect(() => {
        getNewsList(searchValue || undefined);
    },[]);
    
    useEffect(() => {
        getTypes()
    },[getTypes]);

    if(loading) {
        return <Loader/>
    }

    if(error) {
        return <Error/>
    }
    return (
        <div>
            {newsList.length ? <TypesList/> : ''}
            {
                newsList.length === 0 ?
                <div> There is no any news yet !</div> : 
                newsList.map(news => <NewsItem key={news.id} news={news}/>)
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
        getNewsList: (type) => dispatch(getNewsList(type)),
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps,mapDispatchToState)(NewsList);