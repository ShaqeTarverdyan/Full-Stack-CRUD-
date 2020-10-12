import React from 'react';
import { connect } from 'react-redux';
import { addNews } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';

const AddNews = ({ addNews }) => {
    return (
        <NewsForm 
            formSubmitFunction={addNews}
            buttonTitle="Add News"
            headingTitle="Add News"
            initialValues={{
                title: '',
                content: ''
            }}
        />
    )
}

const mapDispatchToState = dispatch => {
    return {
        addNews: (news, history) => dispatch(addNews(news, history))
    }
}

export default connect(null, mapDispatchToState)(AddNews);