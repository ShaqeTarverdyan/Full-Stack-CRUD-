import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthForm from '../authentication/AuthForm';
import { updateAdminDetails, getAdmin  } from '../../store/actions/authActions';


const EditProfile = ({ updateAdminDetails, admin, admin_id, getAdmin  }) => {
    useEffect(() => {
        getAdmin (admin_id)
    }, [getAdmin , admin_id]);

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
        getAdmin : (admin_id) => dispatch(getAdmin (admin_id))
    }
}


export default connect(mapStateToProps,mapDispatchToState)(EditProfile);