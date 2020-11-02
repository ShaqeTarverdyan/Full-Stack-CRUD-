import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


//components
import Navbar from './components/layout/Navbar';
import AdminNewsList from './components/admins/adminNewsList';
import LogIn from './components/authentication/LogIn';
import SignUp from './components/authentication/SignUp';
import AddNews from './components/news/addNews';
import UpdateNews from './components/news/updateNews';
import ProfileDetails from './components/profile/ProfileDetails';
import EditProfile from './components/profile/EditProfile';
import AdminsList from './components/admins/adminsList';
import AcceptAdmins from './components/admins/acceptAdmins';
import AdminDetails from './components/admins/details';
import InvitationRequestForm from './components/admins/invitationRequestForm';
import InvitationResponseForm from './components/admins/invitationResponseForm';
import NewsDetails from './components/news/details';
import Dashboard from './components/dashboard';
import AttachAdmin from './components/admins/attachAdmin'

const App = () => {
 if(window.location.pathname === '/') {
   window.location.pathname = '/news'
 }
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Switch>
            <Route path="/news" component={Dashboard}/>
            <Route path="/adminsNews" exact component={AdminNewsList}/>
            <Route exact path="/addNews" component={AddNews}/>
            <Route path="/update-news/:newsId" component={UpdateNews}/>
            <Route exact path="/profile/" component={ProfileDetails}/>
            <Route path="/admin-details/:id" component={AdminDetails}/>
            <Route exact path="/edit-profile/:adminId" component={EditProfile}/>
            <Route exact path="/logIn" component={LogIn}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/admins" component={AdminsList}/>
            <Route exact path="/accept-panel-admins-page" component={AcceptAdmins}/>
            <Route exact path="/invitation" component={InvitationRequestForm}/>
            <Route path="/accept-invitation/:value" component={InvitationResponseForm}/>
            <Route path="/news-details/:id" component={NewsDetails}/>
            <Route path="/attach-new-admin-to-user/" component={AttachAdmin}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
