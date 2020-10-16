import { CONSTANTS } from '../actions/Constants';

const initialState = {
    loading: false,
    error: null,
    newsList: [],
    currentNews: {}
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state};
    switch(type) {
        case 
        CONSTANTS.GET_NEWS_START,
        CONSTANTS.ADD_NEWS_START,
        CONSTANTS.DELETE_NEWS_START,
        CONSTANTS.GET_CURRENT_NEWS_START: {
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
                newsList: [...payload.allNews]
            }
        }
        case CONSTANTS.GET_CURRENT_NEWS_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                currentNews: {...payload}
            }
        }
        case 
        CONSTANTS.GET_NEWS_ERROR,
        CONSTANTS.ADD_NEWS_ERROR,
        CONSTANTS.DELETE_NEWS_ERROR,
        CONSTANTS.GET_CURRENT_NEWS_ERROR: {
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

        default: {
            return newState;
        }
    }
}