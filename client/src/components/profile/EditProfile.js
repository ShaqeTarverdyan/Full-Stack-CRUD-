import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthForm from '../authentication/AuthForm';
import { updateAdminDetails, getAdminDetails } from '../../store/actions/authActions';


const EditProfile = ({ updateAdminDetails, admin, admin_id, getAdminDetails }) => {
    useEffect(() => {
        getAdminDetails(admin_id)
    }, [getAdminDetails, admin_id]);

    return(
        <AuthForm 
            submitFunction={updateAdminDetails}
            defaultValues={{
                id: admin.id,
                firstname: admin.firstname || '',
                lastname: admin.lastname || '',
                email: admin.email || '',
                role: admin.role || ''
            }}
            butonTitle="update"
        />
    )
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin,
        admin_id: state.auth.admin_id
    }
}

const mapDispatchToState = dispatch => {
    return {
        updateAdminDetails: (admin, history) => dispatch(updateAdminDetails(admin, history)),
        getAdminDetails: (admin_id) => dispatch(getAdminDetails(admin_id))
    }
}


export default connect(mapStateToProps,mapDispatchToState)(EditProfile);