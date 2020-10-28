import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import { attachAdminToNews, notAttachedAdmins } from '../../../store/actions/newsActions';

import Button from '../../UI/Button';
import { Container, FormWrapper, StyledForm, StyledSelect, StyledOption } from '../../../generalStyles';

const AttachAdmin = ({ admins, admin_id, attachAdminToNews, notAttachedAdmins}) => {

    const adminsList = admins ? admins.filter(admin => admin.id != admin_id): [];
    let params = (new URL(window.location.href)).searchParams;
    const newsId = params.get('newsId');
    console.log(newsId)
    useEffect(() => {
        console.log('blblb')
        notAttachedAdmins(newsId)
    },[notAttachedAdmins])
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
                                        adminsList.map(admin => (
                                            <StyledOption key={admin.id} value={admin.email}>{admin.email}</StyledOption>
                                        ))
                                    }
                                </Field>
                                <Button  type="submit">Attach</Button>
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
        admin_id: state.auth.admin_id
    }
}

const mapDispatchToState = dispatch => {
    return {
        attachAdminToNews: (newsId, email) => dispatch(attachAdminToNews(newsId, email)),
        notAttachedAdmins: (id) => dispatch(notAttachedAdmins(id))
    }
}

export default connect(mapStateToProps,mapDispatchToState)(AttachAdmin);