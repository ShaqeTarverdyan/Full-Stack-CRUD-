import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
//import * as Yup from 'yup';
import { roles } from '../../constants';
import { useHistory } from 'react-router-dom';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';
import ErrorPage from '../errorPage';
import Loading from '../loader';

import { Container, FormWrapper, StyledForm, StyledSelect, StyledOption } from '../../generalStyles';


const AuthForm = ({ submitFunction, defaultValues, butonTitle, error, loading, isForSignUp, isInvitaion  }) => {

    let history = useHistory();
    if(loading) {
        return <Loading/>
    }
    return (
        <Container>
            <FormWrapper>
                <Formik
                    initialValues={defaultValues}
                    // validationSchema={}
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
                                />
                                <Field
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    component={Input}
                                />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    disabled={isInvitaion ? true: false}
                                />
                               {
                                isForSignUp && 
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    component={Input}
                                />
                               } 
                               {
                                   isInvitaion &&
                                   <Field
                                        type="text"
                                        name="role"
                                        component={Input}
                                        disabled={true}
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
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps)(AuthForm);