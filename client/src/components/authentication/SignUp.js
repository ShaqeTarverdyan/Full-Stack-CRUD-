import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'

import AuthForm from './AuthForm';

const SignUp = ({ signUp }) => {
    return (
        <AuthForm
            submitFunction={signUp}
            defaultValues={{
                firstname: '',
                lastname: '',
                email: '',
                password: '', 
            }}
            butonTitle="Register"
            isForSignUp={true}
        />
    )
}


const mapDispatchToState = dispatch => {
    return {
        signUp: (newAdmin, history) => dispatch(signUp(newAdmin, history))
    }
}

export default connect(null, mapDispatchToState)(SignUp);