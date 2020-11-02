import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import { attachAdminToNews, getAttachedAdmins, sendImagesWithPDFFormat } from '../../../store/actions/newsActions';

import Button from '../../UI/Button';
import Loading from '../../loader';
import Message from '../../UI/Message';
import Input from '../../UI/Input';

import { StyledForm, StyledSelect, StyledOption } from '../../../generalStyles';

const AttachAdmin = ({ 
    admins, 
    attachAdminToNews, 
    getAttachedAdmins, 
    attachedAdmins,
    loading,
    message,
    isForSendPdf,
    linkedNews,
    newsId,
    sendImagesWithPDFFormat
}) => {
    
    const notAttachedAdmins = admins.filter(({ id: id1 }) => !attachedAdmins.some(({ id: id2 }) => id2 === id1));
    
    // let params = (new URL(window.location.href)).searchParams;
    // const newsId = params.get('newsId');

    useEffect(() => {
        !isForSendPdf && getAttachedAdmins(newsId)
    },[getAttachedAdmins, attachAdminToNews, newsId])

    if(loading) {
        return <Loading/>
    }

    return (
        <>
        <Formik
                initialValues={{
                email: '',
            }}
            onSubmit={async(values, {setSubmitting}) => {
                isForSendPdf? 
                await sendImagesWithPDFFormat('pdf', values) : 
                await attachAdminToNews(newsId,values);
                setSubmitting(false)
            }}
        >
            { 
                () => (
                    <StyledForm>
                        {
                            !isForSendPdf ?
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
                            </Field> :
                            <Field
                                type="email"
                                name="email"
                                component={Input}
                                placeholder="Write Valid Email..."
                            />

                        }
                        <Button  type="submit">Send</Button>
                        <Message success show={message}>{message}</Message>
                    </StyledForm>
                )
            }
        </Formik>
        </>
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
        getAttachedAdmins: (newsId) => dispatch(getAttachedAdmins(newsId)),
        sendImagesWithPDFFormat: (pdfFile, email) => dispatch(sendImagesWithPDFFormat(pdfFile, email))
    }
}

export default connect(mapStateToProps,mapDispatchToState)(AttachAdmin);