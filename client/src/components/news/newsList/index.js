import React, { useEffect, useCallback, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';


const Wrapper = styled.div`
    opacity: ${({ isShownModal }) => (isShownModal ? '0.3' : '1')};
    display: grid;
`;

const NewsListWrapper = styled.div`
    display: grid;
    grid-gap: 2rem;
`;

const NewsList = ({  
        newsList,
        showTypes,
        showPagination,
        showReportFunctionality
    }) => {
    const error = useSelector(state => state.news.error);
    const loading = useSelector(state => state.news.loading);
    const totalPages = useSelector(state => state.news.totalPages);
    const isShownModal = useSelector(state => state.app.isShownModal);

    const dispatch = useDispatch();
    const [linkedNewsIds, setLinkedNewsIds] = useState([]);

    const onCheck = (newsId) => {
        if(linkedNewsIds.find(item => item === newsId)) {
            let uniqueItems = linkedNewsIds.filter(item => item !== newsId);
            return setLinkedNewsIds([...uniqueItems]);
        }
            return setLinkedNewsIds([...linkedNewsIds, newsId])
    }

    useEffect(() => {
        dispatch(getTypes())
    },[getTypes]);

    const history = useHistory();

    let params = (new URL(window.location.href)).searchParams;

    const adminIdFromLocalStorage =  localStorage.getItem('admin_id');
    if(!adminIdFromLocalStorage) {
        history.push("/login")
    }

    const handlePageClick = useCallback(({ selected: selectedPage }) =>{
        let page = selectedPage + 1;
        dispatch(getNewsList(params.get('typeId'), page));
    },[getNewsList, params]);

    return (
        <>
            <Wrapper isShownModal={isShownModal}>
                {loading && <Loader/>}
                {error && <Error/>}
                {showTypes && <TypesList/>}
                <NewsListWrapper>
                    {
                        newsList && newsList.length > 0 ? 
                        newsList.map(news => <NewsItem key={news.id} news={news} onCheck={showReportFunctionality ? onCheck  : null}/> ) : 
                        <EmptyPage/>
                    }
                </NewsListWrapper>
                {
                    linkedNewsIds.length > 0 && showReportFunctionality &&
                    <Button style={StyledButton} onClick={() => dispatch(showModal())}>Report</Button>
                }

            {
                    showPagination && 
                    <Pagination 
                        totalPages={totalPages} 
                        handlePageClick={handlePageClick}
                    />
                } 
            </Wrapper>
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

export default NewsList;