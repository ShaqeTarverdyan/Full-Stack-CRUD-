import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getInvitationData, signUp } from '../../../store/actions/authActions';
import AuthForm from '../../authentication/AuthForm';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

export const InvitaionResponseFormValidation = Yup.object().shape({
    firstname: Yup.string()
        .required('The firstname is required.'),
    lastname: Yup.string()
        .required('The lastname is required.'),
    email: Yup.string()
        .email("invalid Email :|")
        .required('The type is required.'),
    password: Yup.string()
        .required('The passoword is required.')
        .min(6, 'Too short.'),
    role: Yup.string()
        .required('The role is required.'),
    
  });

const InvitaionResponseForm = () => {
    const invitation = useSelector(state => state.auth.invitation);
    const dispatch = useDispatch();
    const history = useHistory();
    const historyPathname = history.location.pathname;
    const parts = historyPathname.split('/');
    const token = parts[parts.length - 1]
    
    useEffect(() => {
        dispatch(getInvitationData(token))
    },[getInvitationData, token]);
    return (
        <AuthForm
            butonTitle="Send"
            isForSignUp={true}
            defaultValues={invitation}
            submitFunction={signUp}
            isInvitaion={true}
            validationSchema={InvitaionResponseFormValidation}
        />
    )
}


export default InvitaionResponseForm;