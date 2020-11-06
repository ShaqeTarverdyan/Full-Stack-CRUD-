import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signUp, clearMessages } from '../../store/actions/authActions';
import * as Yup from 'yup';

import AuthForm from './AuthForm';


export const SignUpValidation = Yup.object().shape({
    firstname: Yup.string()
      .required('Your first name is required.'),
    lastname: Yup.string()
      .required('Your last name is required.'),
    email: Yup.string()
      .email('Invalid email.')
      .required('The email is required.'),
    password: Yup.string()
        .required('The passoword is required.')
        .min(6, 'Too short.'),
  });

const SignUp = ({ signUp, clearMessages }) => {
    useEffect(() => {
      clearMessages()
    },[clearMessages]); 
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
            validationSchema={SignUpValidation}
        />
    )
}


const mapDispatchToState = dispatch => {
    return {
        signUp: (newAdmin, history) => dispatch(signUp(newAdmin, history)),
        clearMessages: () => dispatch(clearMessages())
    }
}

export default connect(null, mapDispatchToState)(SignUp);