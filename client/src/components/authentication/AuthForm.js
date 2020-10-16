import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'
import { Formik, Field } from 'formik';
//import * as Yup from 'yup';
import { roles } from '../../constants';
import { useHistory } from 'react-router-dom';

import Input from '../UI/Input';
import Button from '../UI/Button';
import ErrorPage from '../errorPage';
import Loading from '../loader';

import { Container, FormWrapper, StyledForm, StyledSelect, StyledOption } from '../../generalStyles';


const AuthForm = ({ submitFunction, defaultValues, butonTitle, error, loading, isForSignUp  }) => {

    let history = useHistory();
    if(error) {
        return <ErrorPage>{error}</ErrorPage>
    }
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
                        await submitFunction(values, history);
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
                                <Button disabled={!isValid || setSubmitting} type="submit">{butonTitle}</Button>
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
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const mapDispatchToState = dispatch => {
    return {
        signUp: (newAdmin, history) => dispatch(signUp(newAdmin, history))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AuthForm);