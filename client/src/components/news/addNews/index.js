import React from 'react';
import { connect } from 'react-redux';
import { addNews } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';
import Dashboard from '../../dashboard';

const AddNews = ({ addNews, admin_id }) => {
    
    return (
        admin_id ? <NewsForm 
            formSubmitFunction={addNews}
            buttonTitle="Add News"
            headingTitle="Add News"
            initialValues={{
                title: '',
                content: '',
                newsType: '',
                admin_id: admin_id
            }}
        /> : <Dashboard/>
    )
}
const mapStateToProps = state => {
    return {
        admin_id: state.auth.admin_id
    }
}
const mapDispatchToState = dispatch => {
    return {
        addNews: (news, history, admin_id) => dispatch(addNews(news, history, admin_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AddNews);