import React, { useEffect } from 'react';
import { signUp, clearMessages } from '../../store/actions/authActions';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

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

const SignUp = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(clearMessages())
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

export default SignUp;