import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';

import { roles } from '../../../constants';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Message from '../../UI/Message';
import Loading from '../../loader';
import { Container, FormWrapper, StyledForm, StyledSelect, StyledOption } from '../../../generalStyles';
import { sendInvitation } from '../../../store/actions/authActions';
import * as Yup from 'yup';

export const InvitationValidation = Yup.object().shape({
    email: Yup.string()
        .email("Invalid Email :|")
        .required('Email is required.'),
    role: Yup.string()
        .required('Role is required.'),
  });

const Invitation = ({ sendInvitation, message, loading }) => {
    return (
        <Container>
            <FormWrapper>
                <Formik
                    initialValues={{
                        email: '',
                        role: ''
                    }}
                    validationSchema={InvitationValidation}
                    onSubmit={async(values, {setSubmitting}) => {
                        await sendInvitation(values);
                        setSubmitting(false)
                    }}
                >
                    {
                        ({ isValid, setSubmitting }) => (
                            <StyledForm>
                                <h1>Invitation</h1>
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    component={Input}
                                />
                                <Field as={StyledSelect} name="role">
                                    <StyledOption value="">Choose role</StyledOption>
                                    {
                                        roles.map(({id, value, name}) => (
                                            <StyledOption key={id} value={value}>{name}</StyledOption>
                                        ))
                                    }
                                </Field>
                                <Button disabled={!isValid || setSubmitting} type="submit">
                                    {loading ? <Loading/> : 'Send' }
                                </Button>
                                <Message success show={message}>{message}</Message>
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
        message: state.auth.message,
        loading: state.auth.loading
    }
}
const mapDispatchToState = dispatch => {
    return {
        sendInvitation: (values) => dispatch(sendInvitation(values))
    }
}
export default connect(mapStateToProps, mapDispatchToState)(Invitation);