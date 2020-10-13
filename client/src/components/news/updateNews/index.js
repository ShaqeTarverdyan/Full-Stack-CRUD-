import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateNews, getCurrentNews } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';
import { useHistory } from 'react-router-dom';
import Loading from '../../loader';
import Error from '../../errorPage';

const UpdateNews = ({ getCurrentNews, updateNews, loading, error, currentNews }) => {
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        getCurrentNews(currentNewsId);
    },[currentNewsId]);
    
    if(loading) {
        return <Loading/>
    }
    if(error) {
        return <Error/>
    }
    return (
        <NewsForm 
            formSubmitFunction={updateNews}
            buttonTitle="Update News"
            headingTitle="Update News"
            initialValues={{
                id: currentNews.id || '',
                title: currentNews.title || '',
                content: currentNews.content || ''
            }}
        />
    )
}
const mapStateToProps = state => {
    console.log('state.news.currentNews', state.news.currentNews)
    return {
        loading: state.news.loading,
        error: state.news.error,
        currentNews: state.news.currentNews
    }
}
const mapDispatchToState = dispatch => {
    return {
        updateNews: (news, history) => dispatch(updateNews(news, history)),
        getCurrentNews: (id) => dispatch(getCurrentNews(id))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(UpdateNews);