import React, { useEffect } from 'react';
import { updateNews, getTypes, getCurrentNews, deleteImageFromBackend, deleteFileFromBackend } from '../../../store/actions/newsActions';
import NewsForm from '../newsForm';
import { useHistory } from 'react-router-dom';
import Loading from '../../loader';
import Error from '../../errorPage';
import { useSelector, useDispatch } from 'react-redux';
import { NewsValidation } from '../addNews';

const UpdateNews = () => {
    const loading = useSelector(state => state.news.loading);
    const error = useSelector(state => state.news.error);
    const currentNews = useSelector(state => state.news.currentNews);
    const admin_id = useSelector(state => state.auth.admin_id);
    const imageLoading = useSelector(state => state.news.imageLoading);

    const dispatch = useDispatch();

    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        dispatch(getCurrentNews(currentNewsId));
        dispatch(getTypes());
    },[currentNewsId, getTypes, getCurrentNews]);

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
                content: currentNews.content || '',
                typeId: currentNews.type_id || '',
                admin_id: admin_id,
                images: currentNews.news_images || [],
                files: currentNews.news_files || []
            }}
            isGetingImageUrl={true}
            deleteImageFromBackend={deleteImageFromBackend}
            deleteFileFromBackend={deleteFileFromBackend}
            imageLoading={imageLoading}
            validationSchema={NewsValidation}
        /> 
    )
}


export default UpdateNews;