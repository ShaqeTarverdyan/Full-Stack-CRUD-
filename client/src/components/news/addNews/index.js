import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addNews, getTypes } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';
import Dashboard from '../../dashboard';
import * as Yup from 'yup';

export const AddNewsValidation = Yup.object().shape({
    title: Yup.string()
      .required('The title is required.'),
    content: Yup.string()
      .required('The content is required.'),
    typeId: Yup.string()
      .required('The type is required.'),
  });

const AddNews = ({ addNews, admin_id, getTypes }) => {
    useEffect(() => {
        getTypes()
    },[getTypes])
    return (
        admin_id ? 
        <NewsForm 
            formSubmitFunction={addNews}
            buttonTitle="Add News"
            headingTitle="Add News"
            initialValues={{
                title: '',
                content: '',
                typeId: '',
                files: [],
                admin_id: admin_id
            }}
            isGetingImageUrl={false}
            validationSchema={AddNewsValidation}
        />
 : <Dashboard/>
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