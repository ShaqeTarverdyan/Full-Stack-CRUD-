import { CONSTANTS } from '../actions/Constants';

const initialState = {
    loading: false,
    error: null,
    newsList: [],
    currentNews: {},
    types: [],
    totalItems: '',
    totalPages: '',
    attachedAdmins: [],
    message: ''
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state};
    switch(type) {
        case 
        CONSTANTS.GET_NEWS_START: {
            return {
                ...newState,
                loading: true
            }
        }
        case CONSTANTS.ADD_NEWS_START: {
            return {
                ...newState,
                loading: true
            }
        }
        case CONSTANTS.DELETE_NEWS_START: {
            return {
                ...newState,
                loading: true
            }
        }
        case CONSTANTS.GET_CURRENT_NEWS_START: {
            return {
                ...newState,
                loading: true
            }
        }

        case CONSTANTS.GET_NEWS_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                newsList: [...payload.news],
                totalItems: payload.totalItems,
                totalPages: payload.totalPages
            }
        }
        case CONSTANTS.GET_CURRENT_NEWS_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                currentNews: {...payload},
            }
        }
        case CONSTANTS.GET_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case CONSTANTS.ADD_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case CONSTANTS.DELETE_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }

        case CONSTANTS.GET_CURRENT_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }


        case CONSTANTS.ADD_NEWS_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                newsList: [...newState.newsList, payload.news]
            }
        }

        case CONSTANTS.DELETE_NEWS_SUCCESS: {
            const remainedNews = newState.newsList.filter(news => news.id !== payload);
            return {
                ...newState,
                loading: false,
                error: null,
                newsList: [...remainedNews]
            }
        }

        case CONSTANTS.GET_NEWS_TYPES_START: {
            return {
                ...newState,
                loading: true,
                error: null
            }
        }

        case CONSTANTS.GET_NEWS_TYPES_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                types: [...payload]
            }
        }
        case CONSTANTS.GET_NEWS_TYPES_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case CONSTANTS.GET_CURRENT_IMAGE_START: {
            return {
                ...newState,
                 loading: true,
                 error: null
            }
        }

        case CONSTANTS.GET_CURRENT_IMAGE_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                currentNews: {...newState.currentNews, image: payload }
            }
        }

        case CONSTANTS.GET_CURRENT_IMAGE_ERROR: {
            return {
                ...newState,
                loading: false,
                error: null
            }
        }
        case CONSTANTS.GET_ATTACHED_ADMINS_START: {
            return {
                ...newState,
                loading: true
            }
        }
        case CONSTANTS.GET_ATTACHED_ADMINS_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                attachedAdmins: [...newState.attachedAdmins, ...payload]
            }
        }
        case CONSTANTS.GET_ATTACHED_ADMINS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        case CONSTANTS.ATTACH_ADMIN_TO_NEWS_START: {
            return {
                ...newState,
                loading: true
            }
        }
        case CONSTANTS.ATTACH_ADMIN_TO_NEWS_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                message: payload
            }
        }
        case CONSTANTS.ATTACH_ADMIN_TO_NEWS_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
 
        default: {
            return newState;
        }
    }
}