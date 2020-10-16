import { CONSTANTS } from './Constants';
import Axios from 'axios';

export const signUp = (newAdmin, history) => {
    const { firstname, lastname, email, password } = newAdmin;
    return dispatch => {
        dispatch({type: CONSTANTS.SIGNUP_START})
        Axios.post("http://localhost:3001/admin", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            role: 'panel',
        }).then((response) => {
            if(response.status === 201) {
                dispatch({type: CONSTANTS.SIGNUP_SUCCESS});
                history.push('/login')
            }
        }).catch(error => {
            dispatch({type: CONSTANTS.SIGNUP_ERROR, payload: error.message})
        })
    }
}

export const logIn = (admin,history) => {
    const { email, password } = admin;
    return dispatch => {
        dispatch({type: CONSTANTS.LOGIN_START});
        Axios.post("http://localhost:3001/login", {
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
          dispatch({type: CONSTANTS.LOGIN_ERROR});
      })
    }
}

export const logOut = () => {
    return (dispatch) => {       
        localStorage.clear();
        dispatch({type: CONSTANTS.LOGOUT})

    }
}

export const getAdmins = () => {
    return dispatch => {
        dispatch({type: CONSTANTS.GET_ADMINS_START})
        Axios.get('http://localhost:3001/admins', {
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

export const getAdminDetails = (admin_id) => {
    return dispatch => {
        dispatch({type: CONSTANTS.GET_ADMIN_START})
        Axios.get(`http://localhost:3001/admin/${admin_id}`, {
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
        Axios.put(`http://localhost:3001/admin/${admin.id}`, {
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

export const togglePanelAdminStatus = (id, isActive) => {
    return dispatch => {
        Axios.put(`http://localhost:3001/activateAdmin/${id}`, {
            headers: {
                Authorization: 'Bearer' + localStorage.getItem("token")
            },
            isActive: isActive,
        })
        .then(res => {
            console.log('res', res)
        })
        .catch(err => {
            console.log('errrr', err)
        })
    }
}

export const deleteAdmin = (admin_id) => {
    return (dispatch) => {
        dispatch({type: CONSTANTS.DELETE_ADMIN_START});
        Axios
            .delete(`http://localhost:3001/admin/${admin_id}`, {
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