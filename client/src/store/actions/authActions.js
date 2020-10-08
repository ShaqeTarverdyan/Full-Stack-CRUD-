import { CONSTANTS } from './Constants';
import Axios from 'axios';

export const signUp = (newAdmin) => {
    console.log('newAdmin', newAdmin)
    const { username, email, password, role} = newAdmin;
    return (dispatch, getState) => {
        console.log('signUped', newAdmin)
        Axios.post("http://localhost:3001/register", {
            username: username,
            email: email,
            password: password,
            role: role,
        }).then((response) => {
          if(response.data.error) {
              console.log('error from db', response.data.error.message)
          }else {
            console.log('yes')
          }
        }).catch(error => {
            console.log(error.message)
        })
    }
}

export const logIn = (admin) => {
    return (dispatch, getState) => {
        console.log('signedin', admin)
    }
}