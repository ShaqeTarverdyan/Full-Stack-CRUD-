import React, { useState } from 'react';
import Axios from 'axios';

import { Container, FormWrapper } from '../../generalStyles';

const SignUp = () => {
    const [usernameReg, setUserNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('')
    
    const register = () => {
        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg,
          confirmPassword: confirmPassword,
        }).then((response) => {
          if(response.data.error) {
              console.log('error from db', response.data.error.message)
          }else {
            console.log('yes')
          }
        }).catch(error => {
            console.log(error.message)
        })
    };
    
    return (
        <Container>
            <FormWrapper>
                <h1>Register</h1>
                <label>username</label>
                <input 
                    name="username"
                    type="text"
                    onChange={(e) => {
                        setUserNameReg(e.target.value)
                    }}
                />
                <label>password</label>
                <input 
                    name="password"
                    type="text"
                    onChange={(e) => {
                        setPasswordReg(e.target.value)
                    }}
                />
                 <label>Confirm Password</label>
                <input 
                    name="confirmPassword"
                    type="text"
                    onChange={(e) => {
                        setConfirmpassword(e.target.value)
                    }}
                />
                <button onClick={register}>Register</button>
            </FormWrapper>
        </Container>
    )
}

export default SignUp;