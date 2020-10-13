import { CONSTANTS } from './Constants';
import Axios from 'axios';

export const signUp = (newAdmin, hisory) => {
    console.log('newAdmin', newAdmin)
    const { firstname, lastname, email, password, role} = newAdmin;
    return (dispatch, getState) => {
        dispatch({type: CONSTANTS.SIGNUP_START})
        Axios.post("http://localhost:3001/admin", {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            role: role,
        }).then((response) => {
            console.log('result',response)
            if(response.status === 201) {
                dispatch({type: CONSTANTS.SIGNUP_SUCCESS});
                hisory.push('/login')
            }
        }).catch(error => {
            dispatch({type: CONSTANTS.SIGNUP_ERROR, payload: error.message})
        })
    }
}

export const logIn = (admin) => {
    const { email, password } = admin;
    return (dispatch, getState) => {
        console.log('signedin', admin)
        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
      }).then((response) => {
        console.log('response',response)
        localStorage.setItem("token", JSON.stringify(response.data.token))
      })
      .catch(err => {
          console.log(err)
      })
    }
}