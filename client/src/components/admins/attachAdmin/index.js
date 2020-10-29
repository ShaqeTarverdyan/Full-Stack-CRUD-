import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import { attachAdminToNews, getAttachedAdmins } from '../../../store/actions/newsActions';

import Button from '../../UI/Button';
import Loading from '../../loader';
import Message from '../../UI/Message';

import { Container, FormWrapper, StyledForm, StyledSelect, StyledOption } from '../../../generalStyles';

const AttachAdmin = ({ 
    admins, 
    attachAdminToNews, 
    getAttachedAdmins, 
    attachedAdmins,
    loading,
    message
}) => {
    
    const notAttachedAdmins = admins.
        filter(({ id: id1 }) => 
        !attachedAdmins.some(({ id: id2 }) => id2 === id1));

    useEffect(() => {
        console.log('blblb')
        getAttachedAdmins(newsId)
    },[getAttachedAdmins, attachAdminToNews])

    let params = (new URL(window.location.href)).searchParams;
    const newsId = params.get('newsId');
    if(loading) {
        return <Loading/>
    }
    return (
        <Container style={{display: 'block'}}>
            <FormWrapper>
                <Formik
                     initialValues={{
                        email: '',
                    }}
                    onSubmit={async(values, {setSubmitting}) => {
                        await attachAdminToNews(newsId,values);
                        setSubmitting(false)
                    }}
                >
                   { 
                        () => (
                            <StyledForm>
                                <Field
                                        as={StyledSelect}
                                        name="email"
                                    >
                                    <StyledOption value="">Choose Admin</StyledOption>
                                    {
                                        notAttachedAdmins.map(admin => (
                                            <StyledOption key={admin.id} value={admin.email}>{admin.email}</StyledOption>
                                        ))
                                    }
                                </Field>
                                <Button  type="submit">Attach</Button>
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
        admins: state.auth.admins,
        attachedAdmins: state.news.attachedAdmins,
        loading: state.news.loading,
        message: state.news.message
    }
}

const mapDispatchToState = dispatch => {
    return {
        attachAdminToNews: (newsId, email) => dispatch(attachAdminToNews(newsId, email)),
        getAttachedAdmins: (newsId) => dispatch(getAttachedAdmins(newsId))
    }
}

export default connect(mapStateToProps,mapDispatchToState)(AttachAdmin);