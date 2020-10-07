import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


//components
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard'

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Switch>
            <Route exact path="/" component={Dashboard}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
