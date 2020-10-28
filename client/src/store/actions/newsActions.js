import { CONSTANTS } from './Constants';
import Axios from '../../axios';

export const getMyNewslist = (id) => {
    return dispatch => {
        dispatch({type: CONSTANTS.GET_MYNEWS_START})
        Axios.get('/myNews', {
            params: {
                id: id,
            },
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            },
        })
        .then(response => {
            dispatch({type: CONSTANTS.GET_MYNEWS_SUCCESS, payload: response.data.result})
        })
        .catch(err => {
            console.log(err)
            dispatch({type: CONSTANTS.GET_MYNEWS_ERROR, payload: err})
        })
    }
}
export const getNewsList = (typeId, page) => {
    console.log(typeId, page)
    const searchParams = new URLSearchParams();
    if(page) {
        searchParams.append("page", page);
    }
    if(typeId){
        searchParams.append("typeId", typeId);
    }

    return (dispatch) => {
        dispatch({type: CONSTANTS.GET_NEWS_START});
        Axios.get('/news',
            {
            headers: {
                 Authorization: 'Bearer' + localStorage.getItem("token")
             },
             params: searchParams
            }
         )
        .then(res => {
            dispatch({type: CONSTANTS.GET_NEWS_SUCCESS, payload: res.data.response});
            
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_NEWS_ERROR, payload: err});
        })
    }
}

export const addNews = (newNews, history) => {
    const { title, content, admin_id, image, typeId } = newNews;
    const formData= new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('admin_id', admin_id);
    formData.append('typeId', typeId);
    return (dispatch) => {
        dispatch({type: CONSTANTS.ADD_NEWS_START});

        Axios({
            method: 'post',
            url: '/news',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer' + localStorage.getItem("token")
            },
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
    const { id, title, content, newsType, admin_id } = updatedNews;
    return (dispatch) => {
        dispatch({type: CONSTANTS.UPDATE_NEWS_START});
        Axios.put(`/news/${id}`, {
            newsId: id,
            title: title,
            content: content,
            newsType: newsType,
            admin_id: admin_id
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

export const deleteNews = (newsId, history) => {
    return (dispatch) => {
        dispatch({type: CONSTANTS.DELETE_NEWS_START});
        Axios
            .delete(`/news/${newsId}`, {
                newsId: newsId,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem("token")
                }
            })
            .then((result) => {
                if(result.data.isDeleted === 1) {
                    dispatch({type: CONSTANTS.DELETE_NEWS_SUCCESS, payload: newsId});
                }
                history.push("/news")
                getNewsList()
            })
            .catch(err => {
                dispatch({type: CONSTANTS.DELETE_NEWS_ERROR,payload: err});
            })

    }
};

export const getCurrentNews = (id) => {
    return (dispatch) => {
        dispatch({type: CONSTANTS.GET_CURRENT_NEWS_START});
        Axios
        .get(`/news-/${id}`, {
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
};


export const getTypes = () => {
    return dispatch => {
        dispatch({type: CONSTANTS.GET_NEWS_TYPES_START})
        Axios.get("/types", {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch({type: CONSTANTS.GET_NEWS_TYPES_SUCCESS, payload: res.data.types})
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_NEWS_TYPES_ERROR, payload: err.response.data.message})
        })
    }
}

export const getCurrentImage = (id) => {
    return (dispatch) => {
       dispatch({type: CONSTANTS.GET_CURRENT_IMAGE_START});
        Axios
        .get(`/image/${id}`, {
            imageId: id,
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        })
        .then(result => {
           dispatch({type: CONSTANTS.GET_CURRENT_IMAGE_SUCCESS, payload: result.data.image});
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_CURRENT_IMAGE_ERROR, payload: err.message});
        })
    }
};
