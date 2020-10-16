import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNewsList } from '../../../store/actions/newsActions';


import Loader from '../../loader';
import Error from '../../errorPage';
import NewsItem from '../newsItem'


const NewsList = ({ getNewsList, newsList, loading, error }) => {

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
        getNewsList: () => dispatch(getNewsList())
    }
}

export default connect(mapStateToProps,mapDispatchToState)(NewsList);