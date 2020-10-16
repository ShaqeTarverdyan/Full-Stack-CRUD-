import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmins } from '../../../store/actions/authActions';


import AdminItem from '../adminItem';

const AdminsList = ({ getAdmins, admins }) => {
    useEffect(() => {
        getAdmins();
    },[getAdmins]);

    return (
    <div>
        <button onClick={getAdmins}>All Admins</button>
        <div>
            <label>Filter By</label>
            <select >
                <option value="super">Super</option>
                <option value="panel">Panel</option>
            </select>
        </div>
        <ul>
        {
            admins !== undefined ? admins.map(admin => (
                <AdminItem key={admin.id} item={admin}/>
            )) : <div>loading...</div>
        }
        </ul>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        admins: state.auth.admins
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdmins: () => dispatch(getAdmins())
    }
}
export default connect(mapStateToProps, mapDispatchToState)(AdminsList);