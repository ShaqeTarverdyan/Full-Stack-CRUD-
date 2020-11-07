import React, { useEffect } from 'react';
import { addNews, getTypes } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';
import Dashboard from '../../dashboard';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

export const AddNewsValidation = Yup.object().shape({
    title: Yup.string()
      .required('The title is required.'),
    content: Yup.string()
      .required('The content is required.'),
    typeId: Yup.string()
      .required('The type is required.'),
  });

const AddNews = () => {
    const admin_id = useSelector(state => state.auth.admin_id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
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

export default AddNews;