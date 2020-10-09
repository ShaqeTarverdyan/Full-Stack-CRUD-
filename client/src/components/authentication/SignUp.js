import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { roles } from '../../constants';

import Input from '../UI/Input';
import Button from '../UI/Button';

import { Container, FormWrapper, StyledForm, StyledSelect, StyledOption } from '../../generalStyles';


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
                                     <StyledOption value="">Choose your role</StyledOption>
                                    {
                                        roles.map(({id, name, value}) => (
                                            <StyledOption key={id} value={value}>{name}</StyledOption>
                                        ))
                                    }
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