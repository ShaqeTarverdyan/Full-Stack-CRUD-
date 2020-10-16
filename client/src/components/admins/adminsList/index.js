import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../../store/actions/authActions';
import { Link } from 'react-router-dom';

const AdminsList = ({ getAdmins, admins, deleteAdmin }) => {
    useEffect(() => {
        getAdmins()
    },[getAdmins])

    return (
    <div>
        <ul>
        {
            admins ? admins.map(({ id, firstname, email, role}) => (
                <li key={id}>
                    <span>{firstname}---- </span>
                    <span>{email} ----</span>
                    <span>{role}</span>
                    <Link to={{
                        pathname: `/details/${id}`,
                        aboutProps: {
                            id: id
                        }                 
                    }}>
                        <button >details</button>
                    </Link>
                    <button onClick={() => deleteAdmin(id)}>delete</button>
                </li>
            )) : ''
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
        getAdmins: () => dispatch(getAdmins()),
        deleteAdmin: (admin_id) => dispatch(deleteAdmin(admin_id))
    }
}
export default connect(mapStateToProps, mapDispatchToState)(AdminsList);