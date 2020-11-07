import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { attachAdminToNews, getAttachedAdmins, sendDataToUserWithPdfFormat } from '../../../store/actions/newsActions';

import Button from '../../UI/Button';
import Loading from '../../loader';
import Input from '../../UI/Input';
import { useSelector, useDispatch } from 'react-redux';

import { StyledForm, StyledSelect, StyledOption } from '../../../generalStyles';

const AttachAdmin = ({ isForSendPdf,linkedNewsIds,newsId }) => {
    const admins = useSelector(state =>  state.auth.admins);
    const attachedAdmins = useSelector(state =>  state.news.attachedAdmins);
    const loading = useSelector(state =>  state.news.loading);
    
    const notAttachedAdmins = admins.filter(({ id: id1 }) => !attachedAdmins.some(({ id: id2 }) => id2 === id1));
    
    const dispatch = useDispatch()

    useEffect(() => {
        !isForSendPdf && dispatch(getAttachedAdmins(newsId))
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
                await dispatch(sendDataToUserWithPdfFormat(linkedNewsIds, values.email)) : 
                await dispatch(attachAdminToNews(newsId,values));
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
                        <Button  type="submit">{loading ? <Loading/> : 'Sent'}</Button>
                    </StyledForm>
                )
            }
        </Formik>
        </>
    )
}

export default AttachAdmin;