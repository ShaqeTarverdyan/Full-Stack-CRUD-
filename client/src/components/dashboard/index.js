import React, { useState, useCallback} from 'react';
import Axios from 'axios';


const Dashboard = () => {
    const [admins, setAdmins] = useState([]);

    const getAllAdmins = useCallback(()=> {
        Axios.get("http://localhost:3001/admins")
        .then(response => {
            setAdmins(response.data)
        })
        .catch(err => {
            console.log('err',err)
        })
    },[admins])

    const deleteAdmin = (id) => {
        console.log('id', id)
        Axios.post(`http://localhost:3001/admin/:${id}`, {
          id: id,
        }).then((response) => {
          if(response.data) {
            console.log('ff', response)
          } 
          if(response.error) {
              console.log('errorr :(')
          }
        })
      }

    return(
        <div>
            <h1>Dashboard</h1>
            <div>
                <button onClick={getAllAdmins}>get all admins</button>
                <ul>
                    {
                        admins.length > 0 ? admins.map(({id, username}) => (
                            <li key={id}>
                                <span>{username}</span>
                                <button onClick={() =>deleteAdmin(id)}>delete</button>
                            </li>
                        )) : ''
                    }
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;