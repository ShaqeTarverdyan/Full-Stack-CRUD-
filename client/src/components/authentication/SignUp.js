import React, { useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import Input from '../UI/Input';
import Button from '../UI/Button';

import { Container, FormWrapper, StyledForm, StyledSelect } from '../../generalStyles';

const roles = [
    {id: 1, name: 'Super Admin', value: 'super'},
    {id: 2, name: 'Panel Admin', value: 'panel'}
]
const SignUp = ({ signUp }) => {

    
    return (
        <Container>
            <FormWrapper>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '', 
                        role: ''
                    }}
                    // validationSchema={}
                    onSubmit={async(values, {setSubmitting}) => {
                        await signUp(values);
                        setSubmitting(false)
                    }}

                >
                    {
                        ({isValid, setSubmitting}) => (
                            <StyledForm>
                                <h1>Register</h1>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    component={Input}
                                />
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
                                <Field
                                    as={StyledSelect}
                                    name="role"
                                >
                                    <option value="">Choose your role</option>
                                    <option value="super">Super Admin</option>
                                    <option value="panel">Panel Admin</option>
                                </Field>
                                <Button disabled={!isValid || setSubmitting} type="submit">Register</Button>
                            </StyledForm>
                        )
                    }
                </Formik>
            </FormWrapper>
        </Container>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {

    }
}

const mapDispatchToState = dispatch => {
    return {
        signUp: (newAdmin) => dispatch(signUp(newAdmin))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(SignUp);