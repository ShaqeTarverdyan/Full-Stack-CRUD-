import { CONSTANTS } from './Constants';

export const showModal = () => {
    return dispatch => dispatch({type: CONSTANTS.SHOW_MODAL})
}

export const closeModal = () => {
    return dispatch => {
        dispatch({type: CONSTANTS.CLOSE_MODAL})
    }
}