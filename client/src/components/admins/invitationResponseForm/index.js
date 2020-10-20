import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getInvitationData, signUp } from '../../../store/actions/authActions';
import AuthForm from '../../authentication/AuthForm';


const InvitaionResponseForm = ({ getInvitationData, invitation, signUp }) => {
    const history = useHistory();
    const historyPathname = history.location.pathname;
    const parts = historyPathname.split('/');
    const token = parts[parts.length - 1]
    
    useEffect(() => {
        getInvitationData(token)
    },[getInvitationData]);
    return (
        <AuthForm
            butonTitle="Send"
            isForSignUp={true}
            defaultValues={invitation}
            submitFunction={signUp}
            isInvitaion={true}
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