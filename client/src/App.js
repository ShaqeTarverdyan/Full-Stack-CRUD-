import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


//components
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard';
import News from './components/news/newsPage';
import LogIn from './components/authentication/LogIn';
import SignUp from './components/authentication/SignUp';
import AddNews from './components/news/addNews';
import UpdateNews from './components/news/updateNews';

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/news" component={News}/>
            <Route exact path="/addNews" component={AddNews}/>
            <Route path="/update-news/:newsId" component={UpdateNews}/>
            <Route exact path="/logIn" component={LogIn}/>
            <Route exact path="/signUp" component={SignUp}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
