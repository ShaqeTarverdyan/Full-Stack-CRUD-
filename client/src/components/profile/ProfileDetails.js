import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmin  } from '../../store/actions/authActions';
import  { Link } from 'react-router-dom';
import Loading from '../loader';


const ProfileDetails = ({ getAdmin , admin_id, admin}) => {
    useEffect(() => {
        getAdmin (admin_id)
    }, [getAdmin , admin_id]);

    return (
        <div>
            {
                admin ? 
                <div>
                    <p>First Name: {admin.firstname}</p>
                    <p>Last Name: {admin.lastname}</p>
                    <p>email: {admin.email}</p>
                    <p>Role: {admin.role}</p>
                </div> : 
                <Loading/>
            }
            <Link to={`/edit-profile/${admin.id}`}>
                <button>Edit</button>
            </Link>
        </div>

    )
};


const mapStateToProps = state => {
    return {
        admin_id: state.auth.admin_id,
        admin: state.auth.admin
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdmin : (admin_id) => dispatch(getAdmin (admin_id))
    }
}
export default connect(mapStateToProps,mapDispatchToState)(ProfileDetails);