import React, { useState } from 'react';
import Axios from 'axios';

const SignUp = () => {
    const [usernameReg, setUserNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    
    const register = () => {
        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg,
        }).then((response) => {
          console.log(response);
        })
    };
    
    return (
        <div>
            <h1>Register</h1>
            <label>username</label>
            <input 
                type="text"
                onChange={(e) => {
                setUserNameReg(e.target.value)
                }}
            />
            <label>[password]</label>
            <input 
                type="text"
                onChange={(e) => {
                setPasswordReg(e.target.value)
                }}
            />
            <button onClick={register}>Register</button>
        </div>
    )
}

export default SignUp;