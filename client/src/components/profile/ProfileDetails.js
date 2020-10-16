import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdminDetails } from '../../store/actions/authActions';
import  { Link } from 'react-router-dom';
import Loading from '../loader';


const ProfileDetails = ({ getAdminDetails, admin_id, admin}) => {
    useEffect(() => {
        getAdminDetails(admin_id)
    }, [getAdminDetails, admin_id]);

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
    console.log('satee in profile details', state)
    return {
        admin_id: state.auth.admin_id,
        admin: state.auth.admin
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdminDetails: (admin_id) => dispatch(getAdminDetails(admin_id))
    }
}
export default connect(mapStateToProps,mapDispatchToState)(ProfileDetails);