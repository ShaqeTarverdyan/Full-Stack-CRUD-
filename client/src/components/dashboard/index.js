import React, {useEffect } from 'react';
import { useHistory }  from 'react-router-dom';
import NewsList from '../news/newsList';
import { connect } from 'react-redux';
import { getNewsList } from '../../store/actions/newsActions';
import Loading from '../loader';


const Dashboard = ({getNewsList, newsList}) => {
    let history = useHistory();
    const adminIdFromLocalStorage =  localStorage.getItem('admin_id');
    if(!adminIdFromLocalStorage) {
        history.push("/login")
    }

    useEffect(() => {
        getNewsList();
    },[]);

    return (
        <>
            <h1 style={{textAlign: 'center',margin: "5%"}}>All News</h1>
            <NewsList
                newsList={newsList || <Loading/>}
                showTypes={true}
                showPagination={true}
            />
        </>
    )
}
const mapStateToProps = state => {
    return {
        newsList: state.news.newsList
    }
}
const mapDispatchToState = dispatch => {
    return {
        getNewsList: (type, page) => dispatch(getNewsList(type, page)),
    }
}


export default connect(mapStateToProps, mapDispatchToState)(Dashboard);