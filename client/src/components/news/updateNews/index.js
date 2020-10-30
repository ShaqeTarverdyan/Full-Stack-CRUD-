import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateNews, getTypes, getCurrentNews } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';
import { useHistory } from 'react-router-dom';
import Loading from '../../loader';
import Error from '../../errorPage';

const UpdateNews = ({ 
        updateNews, 
        loading, 
        error, 
        currentNews, 
        admin_id,
        getTypes,
        getCurrentNews
     }) => {
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        getCurrentNews(currentNewsId)
        getTypes();
    },[currentNewsId, getTypes, getCurrentNews]);

    if(loading) {
        return <Loading/>
    }
    if(error) {
        return <Error/>
    }
    console.log('currentNews', currentNews)
    return (
         <NewsForm 
            formSubmitFunction={updateNews}
            buttonTitle="Update News"
            headingTitle="Update News"
            initialValues={{
                id: currentNews.id || '',
                title: currentNews.title || '',
                content: currentNews.content || '',
                typeId: currentNews.typeId || '',
                admin_id: admin_id,
                images: currentNews.images || []
            }}
            isGetingImageUrl={true}
        /> 
    )
}
const mapStateToProps = state => {
    return {
        loading: state.news.loading,
        error: state.news.error,
        currentNews: state.news.currentNews,
        admin_id: state.auth.admin_id,
    }
}
const mapDispatchToState = dispatch => {
    return {
        updateNews: (news, history) => dispatch(updateNews(news, history)),
        getTypes:() => dispatch(getTypes()),
        getCurrentNews:(id) => dispatch(getCurrentNews(id))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(UpdateNews);