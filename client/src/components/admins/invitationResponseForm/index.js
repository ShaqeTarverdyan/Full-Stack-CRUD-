import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getInvitationData, signUp } from '../../../store/actions/authActions';
import AuthForm from '../../authentication/AuthForm';
import * as Yup from 'yup';

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

const InvitaionResponseForm = ({ getInvitationData, invitation, signUp }) => {
    const history = useHistory();
    const historyPathname = history.location.pathname;
    const parts = historyPathname.split('/');
    const token = parts[parts.length - 1]
    
    useEffect(() => {
        getInvitationData(token)
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

const mapStateToProps = state => {
    return {
        invitation: state.auth.invitation
    }
}

const mapDispatchToState = dispatch => {
    return {
        getInvitationData: (token) => dispatch(getInvitationData(token)),
        signUp: (newAdmin, history, isInvitaion) => dispatch(signUp(newAdmin, history, isInvitaion))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(InvitaionResponseForm);