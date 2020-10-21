import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addNews, getTypes } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';
import Dashboard from '../../dashboard';

const AddNews = ({ addNews, admin_id, getTypes }) => {
    useEffect(() => {
        getTypes()
    },[getTypes])
    return (
        admin_id ? <NewsForm 
            formSubmitFunction={addNews}
            buttonTitle="Add News"
            headingTitle="Add News"
            initialValues={{
                title: '',
                content: '',
                typeId: '',
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
        getTypes:() => dispatch(getTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AddNews);