import React from 'react';
import { useHistory }  from 'react-router-dom';


const Dashboard = () => {
    let history = useHistory();
    const adminIdFromLocalStorage =  localStorage.getItem('admin_id');
    if(!adminIdFromLocalStorage) {
        history.push("/login")
    }
    return(
        <div>
            <h1>Welcome Dashboard:)</h1>
        </div>
    )
}

export default Dashboard;