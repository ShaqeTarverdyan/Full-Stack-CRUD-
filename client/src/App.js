import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


//components
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard';
import News from './components/newsPage';
import LogIn from './components/authentication/LogIn';
import SignUp from './components/authentication/SignUp'

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/news" component={News}/>
            <Route path="/logIn" component={LogIn}/>
            <Route path="/signUp" component={SignUp}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
