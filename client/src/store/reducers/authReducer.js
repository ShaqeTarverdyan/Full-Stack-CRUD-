import { CONSTANTS } from '../actions/Constants';

const initialState = {
    loading: false,
    eror: null,
    user: {}
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state};
    switch(type) {
        case CONSTANTS.SIGNUP_START: {
            return { ...newState, loading: true}
        }
        case CONSTANTS.SIGNUP_SUCCESS: {
            return { ...newState, loading: false, error: null}
        }
        case CONSTANTS.SIGNUP_ERROR: {
            console.log('error', payload)
            return {...newState, loading: false, error: payload}
        }
        default: {
			return newState
		}
    }
}