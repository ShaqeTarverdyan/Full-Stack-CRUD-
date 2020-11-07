import React, { useEffect } from 'react';
import AuthForm from '../authentication/AuthForm';
import { updateAdminDetails, getAdmin  } from '../../store/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';


const EditProfile = () => {
    const admin = useSelector(state => state.auth.admin);
    const admin_id = useSelector(state => state.auth.admin_id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdmin (admin_id));
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

export default EditProfile;