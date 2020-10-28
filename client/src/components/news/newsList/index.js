import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { getNewsList, getTypes } from '../../../store/actions/newsActions';
import Pagination from '../../pagination';
import styled from 'styled-components';

import Loader from '../../loader';
import Error from '../../errorPage';
import NewsItem from '../newsItem';
import { useHistory } from 'react-router-dom';

import TypesList from '../typesList';


const NewsListWrapper = styled.div`
    position: relative
`;
const NewsList = ({ getNewsList, loading, error, getTypes, newsList, totalPages }) => {
    const history = useHistory();

    let params = (new URL(window.location.href)).searchParams;
    let type = params.get('typeId');

    const adminIdFromLocalStorage =  localStorage.getItem('admin_id');
    if(!adminIdFromLocalStorage) {
        history.push("/login")
    }
    useEffect(() => {
        getNewsList(type);
    },[]);
   
    useEffect(() => {
        getTypes()
    },[getTypes]);

    const handlePageClick = useCallback(({ selected: selectedPage }) =>{
        console.log('window', window.location.href)
        console.log('type', params.get('typeId'))
        let page = selectedPage + 1;
        getNewsList(params.get('typeId'), page);
    },[getNewsList])

    return (
        <NewsListWrapper>
            {loading && <Loader/>}
            {error && <Error/>}
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
        </NewsListWrapper>
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