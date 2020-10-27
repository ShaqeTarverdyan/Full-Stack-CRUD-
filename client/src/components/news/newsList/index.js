import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { getNewsList, getTypes } from '../../../store/actions/newsActions';
import Pagination from '../../pagination';


import Loader from '../../loader';
import Error from '../../errorPage';
import NewsItem from '../newsItem';
import { useHistory } from 'react-router-dom';

import TypesList from '../typesList';



const NewsList = ({ getNewsList, loading, error, getTypes, newsList, totalPages }) => {
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

    const handlePageClick = useCallback(({ selected: selectedPage }) =>{
        let page = selectedPage + 1;
        getNewsList(searchValue || undefined, page);
    },[getNewsList])

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
            <Pagination 
                totalPages={totalPages} 
                handlePageClick={handlePageClick}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.news.error,
        loading: state.news.loading,
        newsList: state.news.newsList,
        totalPages: state.news.totalPages
    }
}

const mapDispatchToState = dispatch => {
    return {
        getNewsList: (type, page) => dispatch(getNewsList(type, page)),
        getTypes: () => dispatch(getTypes())
    }
}

export default connect(mapStateToProps,mapDispatchToState)(NewsList);