import { CONSTANTS } from '../actions/Constants';

const initialState = {
    loading: false,
    eror: null,
    admins: [],
    admin: {},
    admin_id: '',
    invitation: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    },
    message: ''
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state};
    switch(type) {
        case CONSTANTS.SIGNUP_START: {
            return { ...newState, loading: true}
        }
        case CONSTANTS.LOGIN_START: {
            return { ...newState, loading: true}
    }
        case CONSTANTS.SIGNUP_SUCCESS: {
            return { ...newState, loading: false, error: null}
        }
        case CONSTANTS.LOGIN_SUCCESS: {
            return {...newState, loading: false, error: null, admin_id: payload}
        }
        case CONSTANTS.SIGNUP_ERROR: {
            return {...newState, loading: false, error: payload}
        }
        case CONSTANTS.GET_ADMIN_ERROR: {
            return {...newState, loading: false, error: payload}
        }
        case CONSTANTS.LOGIN_ERROR: {
            return { ...newState, loading: false, error: payload}
        }
        case CONSTANTS.SET_ADMIN_ID_IN_STORE: {
            return {...newState, admin_id: payload}
        }
        case CONSTANTS.DELETE_TOKEN_FROM_STORE: {
            return { ...newState, admin_id: ''}
        }
        case CONSTANTS.GET_ADMIN_SUCCESS: {
            return {
                ...newState, 
                loading: false, 
                error: null, 
                admin: {...payload}
            }
        }
        case CONSTANTS.GET_ADMINS_START: {
            return { ...newState, loading: true}
        }
        case CONSTANTS.GET_ADMINS_SUCCESS: {
            const admins = payload;
            return {
                ...newState,
                loading: false,
                error: null,
                admins: [...admins]
            }
        }
        case CONSTANTS.GET_ADMINS_ERROR: {
            return {...newState, loading: false, error: null}
        }

        case CONSTANTS.UPDATE_ADMIN_START: {
            return { ...newState, loading: true, error: null}
        }

        case CONSTANTS.UPDATE_ADMIN_SUCCESS: {
            const updatedAdmin = {...payload};
            const updatedAdmins = newState.admins.map(admin => {
                if(admin.id === updatedAdmin.id) {
                    return updatedAdmin
                }
                return admin
            });
            return {
                 ...newState, 
                 loading: false, 
                 error: null, 
                 admin: {...payload},
                 admins: [...updatedAdmins]
                }
        }
        case CONSTANTS.UPDATE_ADMIN_ERROR: {
            return {...newState, loading: false, error: null}
        }

        case CONSTANTS.LOGOUT : {
                return { ...newState, admin_id: ''}
        }
        case CONSTANTS.DELETE_ADMIN_START: {
            return { ...newState, loading: true, error: null}
        }
        case CONSTANTS.DELETE_ADMIN_SUCCESS: {
            const remainedAdmins = newState.admins.filter(admin => admin.id !== payload);
            return {
                ...newState,
                loading: false,
                error: null,
                admins: [...remainedAdmins]
            }
        }
        case CONSTANTS.DELETE_ADMIN_ERROR: {
            return {...newState, loading: false, error: null}
        }
        case CONSTANTS.GET_INVITATION_DATA_START: {
            return { ...newState, loading: true, error: null}
        }
        case CONSTANTS.GET_INVITATION_DATA_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                invitation: {...newState.invitation, ...payload}
            }
        }

        case CONSTANTS.GET_INVITATION_DATA_ERROR: {
            return {...newState, loading: false, error: null}
        }
        case CONSTANTS.SEND_INVITATION_START: {
            return { ...newState, loading: true, error: null}
        }
        case CONSTANTS.SEND_INVITATION_SUCCESS: {
            return {
                ...newState,
                loading: false,
                error: null,
                message: payload
            }
        }
        case CONSTANTS.SEND_INVITATION_ERROR: {
            return {
                ...newState,
                loading: false,
                error: payload
            }
        }
        default: {
			return newState
		}
    }
}