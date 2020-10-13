import { CONSTANTS } from './Constants';
import Axios from 'axios';

export const getNewsList = () => {
    return (dispatch) => {
        dispatch({type: CONSTANTS.GET_NEWS_START});
        Axios.get("http://localhost:3001/news-list", {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch({type: CONSTANTS.GET_NEWS_SUCCESS, payload: res.data});
            
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_NEWS_ERROR});
        })
    }
}

export const addNews = (newNews, history) => {
    const { title, content } = newNews;
    return (dispatch) => {
        dispatch({type: CONSTANTS.ADD_NEWS_START});
        Axios.post("http://localhost:3001/news", {
            title: title,
            content: content,
        },{
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        }).then((response) => {
            if(response.status === 200) {
                dispatch({type: CONSTANTS.ADD_NEWS_SUCCESS, payload: response.data});
                history.push('/news')
            }
        }).catch(err => {
            dispatch({type: CONSTANTS.ADD_NEWS_ERROR, payload: err.message})
        })
    }
}

export const updateNews = (updatedNews, history) => {
    const { id, title, content } = updatedNews;
    return (dispatch) => {
        dispatch({type: CONSTANTS.UPDATE_NEWS_START});
        Axios.put(`http://localhost:3001/news/${id}`, {
            newsId: id,
            title: title,
            content: content
        },{            
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
        }}).then((response) => {
            if(response.status === 200) {
                dispatch({type: CONSTANTS.UPDATE_NEWS_SUCCESS, payload: response.data});
                history.push('/news')
            }
        }).catch(err => {
            dispatch({type: CONSTANTS.UPDATE_NEWS_ERROR, payload: err.message})
        })
    }
}

export const deleteNews = (newsId) => {
    return (dispatch) => {
        dispatch({type: CONSTANTS.DELETE_NEWS_START});
        Axios
            .delete(`http://localhost:3001/news/${newsId}`, {
                newsId: newsId,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem("token")
                }
            })
            .then((result) => {
                if(result.data.isDeleted === 1) {
                    dispatch({type: CONSTANTS.DELETE_NEWS_SUCCESS, payload: newsId});
                }
                getNewsList()
            })
            .catch(err => {
                dispatch({type: CONSTANTS.DELETE_NEWS_ERROR});
            })

    }
};

export const getCurrentNews = (id) => {
    return (dispatch) => {
        dispatch({type: CONSTANTS.GET_CURRENT_NEWS_START});
        Axios
        .get(`http://localhost:3001/news-/${id}`, {
            newsId: id,
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        })
        .then(result => {
            dispatch({type: CONSTANTS.GET_CURRENT_NEWS_SUCCESS, payload: result.data.news});
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_CURRENT_NEWS_ERROR, payload: err.message});
        })
    }
}