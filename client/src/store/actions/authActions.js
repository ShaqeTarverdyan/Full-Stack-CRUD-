import { CONSTANTS } from './Constants';
import Axios from '../../axios';

export const signUp = (newAdmin, history, isInvitaion) => {
    const { firstname, lastname, email, password, role, isConfirmed, isActive } = newAdmin;
    return dispatch => {
        dispatch({type: CONSTANTS.SIGNUP_START})
        Axios.post("/admin", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            role: role || 'panel',
            isConfirmed: isConfirmed || false,
            isActive: isActive || false,
            isInvitaion: isInvitaion || undefined
        }).then((response) => {
            if(response.status === 201) {
                dispatch({type: CONSTANTS.SIGNUP_SUCCESS});
                history.push('/login')
            }
        }).catch(error => {
            dispatch({type: CONSTANTS.SIGNUP_ERROR, payload: error.response.data.message})
        })
    }
}

export const logIn = (admin,history) => {
    const { email, password } = admin;
    return dispatch => {
        dispatch({type: CONSTANTS.LOGIN_START});
        Axios.post("/login", {
            email: email,
            password: password,
      }).then((response) => {
            const token = JSON.stringify(response.data.token);
            const admin_id = response.data.admin_id;

            dispatch({type: CONSTANTS.LOGIN_SUCCESS, payload: admin_id});

            localStorage.setItem("token", token);
            localStorage.setItem("admin_id", admin_id);

            dispatch({type: CONSTANTS.SET_ADMIN_ID_IN_STORE, payload: token})
            history.push('/news')
      })
      .catch(err => {
          dispatch({type: CONSTANTS.LOGIN_ERROR, payload: err.response.data.message});
      })
    }
}

export const logOut = () => {
    return (dispatch) => {       
        localStorage.clear();
        dispatch({type: CONSTANTS.LOGOUT})
        window.location.pathname = '/login'
    }
}

export const getAdmins = (role) => {
    return dispatch => {
        dispatch({type: CONSTANTS.GET_ADMINS_START})
        Axios.get('/admins', {
                params: {role: role || undefined}
            },
            {
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem("token")
                }
            })
        .then(res => {
            dispatch({type: CONSTANTS.GET_ADMINS_SUCCESS, payload: res.data.admins})
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_ADMINS_ERROR, payload: err.message})
        })
    }
}

export const getAdmin = (admin_id) => {
    return dispatch => {
        dispatch({type: CONSTANTS.GET_ADMIN_START})
        Axios.get(`/admin/${admin_id}`, {
            admin_id: admin_id
        },{
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch({type: CONSTANTS.GET_ADMIN_SUCCESS, payload: res.data.admin})
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_ADMIN_ERROR, payload: err.message})
        })
    }
} 

export const updateAdminDetails = (admin, history) => {
    const { id, firstname, lastname, email } = admin;
    return dispatch => {
        dispatch({type: CONSTANTS.UPDATE_ADMIN_START});
        Axios.put(`/admin/${admin.id}`, {
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: admin.role
        },{
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            }
        })
        .then(res => {
            dispatch({type: CONSTANTS.UPDATE_ADMIN_SUCCESS, payload: res.data.admin});
            history.push("/profile")
        })
        .catch(err => {
            dispatch({type: CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.message});
        })
    }
}


export const toggleConfirmation = (id, value) => {
    return dispatch => {
        dispatch({type: CONSTANTS.UPDATE_ADMIN_START});
        Axios.put(`/confirm/${id}`, {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            },
            isConfirmed: value
        })
        .then(res => {
            dispatch({type: CONSTANTS.UPDATE_ADMIN_SUCCESS, payload: res.data.admin});
        })
        .catch(err => {
            dispatch({type: CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.message});
        })
    }
}

export const togglePanelAdminStatus = (id, isActive) => {
    return dispatch => {
        dispatch({type: CONSTANTS.UPDATE_ADMIN_START});
        Axios.put(`/activateAdmin/${id}`, {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            },
            isActive: isActive,
        })
        .then(res => {
            dispatch({type: CONSTANTS.UPDATE_ADMIN_SUCCESS, payload: res.data.admin});
        })
        .catch(err => {
            dispatch({type: CONSTANTS.UPDATE_ADMIN_ERROR, payload: err.message});
        })
    }
}

export const deleteAdmin = (admin_id) => {
    return (dispatch) => {
        dispatch({type: CONSTANTS.DELETE_ADMIN_START});
        Axios
            .delete(`/admin/${admin_id}`, {
                admin_id: admin_id,
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem("token")
                }
            })
            .then((result) => {
                if(result.status === 200) {
                    dispatch({type: CONSTANTS.DELETE_ADMIN_SUCCESS, payload: admin_id});
                }
                getAdmins()
            })
            .catch(err => {
                dispatch({type: CONSTANTS.DELETE_ADMIN_ERROR});
            })

    }
};
export const setAdminIdinStore = () => {
	return (dispatch) => {
        const getlogedinAdminId = localStorage.getItem('admin_id');
        getlogedinAdminId && 
        dispatch({type: CONSTANTS.SET_ADMIN_ID_IN_STORE, payload:  getlogedinAdminId})	
	}
}

export const sendInvitation = (values) => {
    const { email, role } = values;
    return dispatch => {
        dispatch({type: CONSTANTS.SEND_INVITATION_START})
        Axios
            .post("/invitation", {
                email: email,
                role: role
            })
            .then(res => {
                if(res.status === 200) {
                    dispatch({type: CONSTANTS.SEND_INVITATION_SUCCESS, payload: res.data.message})
                }
            })
            .catch(err => {
                dispatch({type: CONSTANTS.SEND_INVITATION_ERROR, payload: err.response.message})
            })
    }
}

export const getInvitationData = (token) => {
    return dispatch => {
        dispatch({type: CONSTANTS.GET_INVITATION_DATA_START})
        Axios.get(`/recievedToken`, {
            params: {hashedToken: token}
        })
        .then(res => {
            dispatch({type: CONSTANTS.GET_INVITATION_DATA_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: CONSTANTS.GET_INVITATION_DATA_ERROR, payload: err.message})
        })
    }
}