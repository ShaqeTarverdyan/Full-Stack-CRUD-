import React from 'react';
import SignIn from '../authentication/SignIn';
import SignUp from '../authentication/SignUp';


const Dashboard = () => {
    return(
        <div>
            <h1>Dashboard</h1>
            <SignIn/>
            <SignUp/>
        </div>
    )
}

export default Dashboard;