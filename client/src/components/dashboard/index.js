import React, {useEffect } from 'react';
import { useHistory }  from 'react-router-dom';
import NewsList from '../news/newsList';
import { getNewsList } from '../../store/actions/newsActions';
import Loading from '../loader';
import { useSelector, useDispatch } from 'react-redux';


const Dashboard = () => {
    const newsList = useSelector(state => state.news.newsList);
    const dispatch = useDispatch();
    let history = useHistory();
    const adminIdFromLocalStorage =  localStorage.getItem('admin_id');
    if(!adminIdFromLocalStorage) {
        history.push("/login")
    }

    useEffect(() => {
        dispatch(getNewsList());
    },[getNewsList]);

    return (
        <>
            <h1 style={{textAlign: 'center',margin: "5%"}}>All News</h1>
            <NewsList
                newsList={newsList || <Loading/>}
                showTypes={true}
                showPagination={true}
                showReportFunctionality={false}
            />
        </>
    )
}



export default Dashboard;