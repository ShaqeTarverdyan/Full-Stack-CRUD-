import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Input from '../UI/Input';
import Button from '../UI/Button';

import { Container, FormWrapper, StyledForm } from '../../generalStyles';

const SignIn = ({ logIn }) => {
    let history = useHistory();
    return (
        <Container>
            <FormWrapper>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  // validationSchema={}
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
                        </StyledForm>
                    )
                  }
                </Formik>
            </FormWrapper>
        </Container>
    )
}

const mapDispatchtoState = dispatch => {
  return {
    logIn: (admin, history) => dispatch(logIn(admin, history))
  }
}

export default connect(null, mapDispatchtoState)(SignIn);