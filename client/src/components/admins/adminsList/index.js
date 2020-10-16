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
            admins ? admins.map(admin => (
                <li key={admin.id}>
                    <span>{admin.firstname}---- </span>
                    <span>{admin.email} ----</span>
                    <span>{admin.role}</span>
                    <Link to={{
                        pathname:"/edit-admin/"+admin.id,
                        aboutProps: {
                            admin: admin
                        }
                    }}>
                        <button>update</button>
                    </Link>
                    <button onClick={() => deleteAdmin(admin.id)}>delete</button>
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