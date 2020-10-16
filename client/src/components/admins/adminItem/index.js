import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAdmin } from '../../../store/actions/authActions';


const AdminItem = ({ item, admin }) => {
    const { id, firstname, email, role } = item;
    return (
        <div>
            <span>{firstname}---- </span>
            <span>{email} ----</span>
            <span>{role}</span>
            {
                admin.role === 'super' &&
                <>
                    <Link to={{
                        pathname: `/details/${id}`,
                        aboutProps: {
                            id: id
                        }                 
                    }}>
                        <button >details</button>
                    </Link>
                    <button onClick={() => deleteAdmin(id)}>delete</button>
                </>
            }
        </div>
    )
}
const mapStateToProps = state => {
    return {
        admin: state.auth.admin
    }
}

const mapDispatchToState = dispatch => {
    return {
        deleteAdmin: (admin_id) => dispatch(deleteAdmin(admin_id))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AdminItem);