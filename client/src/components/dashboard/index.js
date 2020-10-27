import React from 'react';
import { useHistory }  from 'react-router-dom';
import NewsList from '../news/newsList';


const Dashboard = () => {
    let history = useHistory();
    const adminIdFromLocalStorage =  localStorage.getItem('admin_id');
    if(!adminIdFromLocalStorage) {
        history.push("/login")
    }
    return <NewsList/>
}

export default Dashboard;