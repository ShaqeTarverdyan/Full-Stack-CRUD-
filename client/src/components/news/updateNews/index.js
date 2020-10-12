import React from 'react';
import { connect } from 'react-redux';
import { updateNews } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';

const UpdateNews = ( props) => {
    const newsData = props.location.aboutProps.news;
    return (
        <NewsForm 
            formSubmitFunction={props.updateNews}
            buttonTitle="Update News"
            headingTitle="Update News"
            initialValues={{
                title: newsData.title,
                content: newsData.content
            }}
        />
    )
}

const mapDispatchToState = dispatch => {
    return {
        updateNews: (news, history) => dispatch(updateNews(news, history))
    }
}

export default connect(null, mapDispatchToState)(UpdateNews);