import React, { useEffect } from 'react';
import { logIn, clearMessages } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';
import {generateCustomError } from '../../helpers/generateCustomError';
import { useSelector, useDispatch } from 'react-redux';

import { Container, FormWrapper, StyledForm } from '../../generalStyles';

const LoginInValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string()
  	.required('The passoword is required.')
  	.min(6, 'Too short.'),
})

const SignIn = () => {
  const error = useSelector(state => state.auth.error);
  const errormessages = useSelector(state => state.auth.errormessages);
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(clearMessages());
    },[clearMessages]);

    let history = useHistory();
    return (
        <Container>
            <FormWrapper>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validationSchema={LoginInValidation}
                  onSubmit = {async(values, {setSubmitting}) => {
                    await dispatch(logIn(values,history));
                    setSubmitting(false)
                  }}
                >
                  {
                    ({isValid, setSubmitting}) => (
                        <StyledForm>
                            <h1>LogIn</h1>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                              component={Input}
                              serverError={generateCustomError(errormessages,"email")}
                            />
                            <Field
                              type="password"
                              name="password"
                              placeholder="Password"
                              component={Input}
                              serverError={generateCustomError(errormessages,"password")}
                            />
                            <Button disabled={!isValid || setSubmitting} type="submit">Login</Button>
                            <Message error show={error}>{error}</Message>
                        </StyledForm>
                    )
                  }
                </Formik>
            </FormWrapper>
        </Container>
    )
}

export default SignIn;