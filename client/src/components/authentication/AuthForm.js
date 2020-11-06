import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import { useHistory } from 'react-router-dom';


import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';
import Loading from '../loader';
import {generateCustomError } from '../../helpers/generateCustomError';

import { Container, FormWrapper, StyledForm } from '../../generalStyles';


const AuthForm = ({ 
    submitFunction, 
    defaultValues, 
    butonTitle, 
    error, 
    loading, 
    isForSignUp, 
    isInvitaion  ,
    validationSchema,
    errormessages
}) => {

    let history = useHistory();
    if(loading) {
        return <Loading/>
    }
    return (
        <Container>
            <FormWrapper>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    onSubmit={async(values, {setSubmitting}) => {
                        await submitFunction(values, history, isInvitaion);
                        setSubmitting(false)
                    }}

                >
                    {
                        ({isValid, setSubmitting}) => (
                            <StyledForm>
                                <h1>Register</h1>
                                <Field
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    component={Input}
                                    serverError={generateCustomError(errormessages,"firstname")}
                                />
                                
                                <Field
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    component={Input}
                                    serverError={generateCustomError(errormessages,"lastname")}
                                />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    disabled={isInvitaion ? true: false}
                                    serverError={generateCustomError(errormessages,"email")}
                                />
                                
                               {
                                isForSignUp && 
                                <>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    component={Input}
                                    serverError={generateCustomError(errormessages,"password")}
                                />
                                </>
                               } 
                               {
                                   isInvitaion &&
                                   <Field
                                        type="text"
                                        name="role"
                                        component={Input}
                                        disabled={true}
                                        serverError={generateCustomError(errormessages,"role")}
                                   />
                               }
                                <Button disabled={!isValid || setSubmitting} type="submit">{butonTitle}</Button>
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
        error: state.auth.error,
        loading: state.auth.loading,
        errormessages: state.auth.errormessages
    }
}

export default connect(mapStateToProps)(AuthForm);