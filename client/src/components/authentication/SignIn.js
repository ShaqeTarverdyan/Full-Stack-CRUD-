import React, { useState } from 'react';
import Axios from 'axios';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setloginStatus] = useState('');



    const login = () => {
      Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      }).then((response) => {
        if(response.data.message) {
          setloginStatus(response.data.message)
        }  else {
          setloginStatus(response.data[0].username)
        }
      })
    }
    return (
        <div>
            <h1>Login</h1>
            <label>username</label>
            <input 
            type="text"
            onChange={(e) => {
                setUsername(e.target.value)
            }}
            />
            <label>password</label>
            <input 
            type="text"
            onChange={(e) => {
                setPassword(e.target.value)
            }}
            />
            <button onClick={login}>Login</button>
            <h3>{loginStatus}</h3>
        </div>
    )
}

export default SignIn;