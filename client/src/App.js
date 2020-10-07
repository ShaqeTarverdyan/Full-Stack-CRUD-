import React, {useState} from 'react';
import Axios from 'axios';

const App = () => {
  const [usernameReg, setUserNameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setloginStatus] = useState('');


  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    })
  };

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
    <>
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
    </div>
    <h3>{loginStatus}</h3>
  </>
  );
}

export default App;
