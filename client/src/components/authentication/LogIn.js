import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';

import { Container, FormWrapper, StyledForm } from '../../generalStyles';

const LoginInValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string()
  	.required('The passoword is required.')
  	.min(6, 'Too short.'),
})

const SignIn = ({ logIn, error }) => {
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
                    await logIn(values,history);
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
                            />
                            <Field
                              type="password"
                              name="password"
                              placeholder="Password"
                              component={Input}
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

const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}
const mapDispatchtoState = dispatch => {
  return {
    logIn: (admin, history) => dispatch(logIn(admin, history))
  }
}

export default connect(mapStateToProps, mapDispatchtoState)(SignIn);