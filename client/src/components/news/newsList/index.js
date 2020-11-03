import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { getNewsList, getTypes } from '../../../store/actions/newsActions';
import { showModal } from '../../../store/actions/appActions';
import Pagination from '../../pagination';
import styled from 'styled-components';
import Modale from '../../Modale';
import AttachAdmin from '../../admins/attachAdmin';

import Loader from '../../loader';
import Error from '../../errorPage';
import NewsItem from '../newsItem';
import { useHistory } from 'react-router-dom';
import EmptyPage from '../../emptyPage';
import TypesList from '../typesList';
import Button from '../../UI/Button';


const NewsListWrapper = styled.div`
opacity: ${({ isShownModal }) => (isShownModal ? '0.3' : '1')};
`;
const NewsList = ({ 
        getNewsList, 
        loading, 
        error, 
        getTypes, 
        newsList, 
        totalPages,
        showTypes,
        showPagination,
        showModal,
        isShownModal,
        showReportFunctionality
    }) => {
    const [linkedNewsIds, setLinkedNewsIds] = useState([]);

    const onCheck = (newsId) => {
        if(linkedNewsIds.find(item => item === newsId)) {
            let uniqueItems = linkedNewsIds.filter(item => item !== newsId);
            return setLinkedNewsIds([...uniqueItems]);
        }
            return setLinkedNewsIds([...linkedNewsIds, newsId])
    }

    useEffect(() => {
        getTypes()
    },[getTypes]);

    const history = useHistory();

    let params = (new URL(window.location.href)).searchParams;

    const adminIdFromLocalStorage =  localStorage.getItem('admin_id');
    if(!adminIdFromLocalStorage) {
        history.push("/login")
    }

    const handlePageClick = useCallback(({ selected: selectedPage }) =>{
        let page = selectedPage + 1;
        getNewsList(params.get('typeId'), page);
    },[getNewsList, params]);

    return (
        <>
            <NewsListWrapper isShownModal={isShownModal}>
                {loading && <Loader/>}
                {error && <Error/>}
                {showTypes && <TypesList/>}
                {
                    newsList && newsList.length > 0 ? 
                    newsList.map(news => <NewsItem key={news.id} news={news} onCheck={showReportFunctionality ? onCheck  : null}/> ) : 
                    <EmptyPage/>
                }
                {
                linkedNewsIds.length > 0 && showReportFunctionality &&
                <Button style={StyledButton} onClick={showModal}>Report</Button>
                }

            {
                    showPagination && 
                    <Pagination 
                        totalPages={totalPages} 
                        handlePageClick={handlePageClick}
                    />
                } 
            </NewsListWrapper>
            <Modale>
                <AttachAdmin 
                    isForSendPdf={true}
                    linkedNewsIds={linkedNewsIds}
                />
            </Modale>
        </>
    )
}

const StyledButton = {
    "width": '40%',
    "display": "flex",
    "margin": "auto",
    "justifyContent": "center",
    "backgroundColor": "var(--color-mainDark)"
}

const mapStateToProps = state => {
    return {
        error: state.news.error,
        loading: state.news.loading,
        totalPages: state.news.totalPages,
        isShownModal: state.app.isShownModal
    }
}

const mapDispatchToState = dispatch => {
    return {
        getNewsList: (type, page) => dispatch(getNewsList(type, page)),
        getTypes: () => dispatch(getTypes()),
        showModal: () => dispatch(showModal()),
    }
}

export default connect(mapStateToProps,mapDispatchToState)(NewsList);