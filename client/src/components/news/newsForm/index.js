import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Input from '../../UI/Input';
import Button from '../../UI/Button';
import TextArea from '../../UI/TextArea';
import ErrorPage from '../../errorPage';
import Loading from '../../loader';

import { StyledForm} from '../../../generalStyles';

const Wrapper = styled.div`
    width: 600px;
    margin: 0 auto;
`;


const NewsForm = ({ 
        formSubmitFunction, 
        buttonTitle, 
        headingTitle, 
        loading, 
        error,
        initialValues

    }) => {

    const defaultValues = Object.keys(initialValues).length > 0 && initialValues
    let history = useHistory();

    if(error) {
        return <ErrorPage/>
    }
    return (
        <Wrapper>
            <Formik
                initialValues={defaultValues}
                // validationSchema={}
                onSubmit={async(values, {setSubmitting}) => {
                    await formSubmitFunction(values, history);
                    setSubmitting(false)
                }}

            >
                {
                    ({isValid, setSubmitting}) => (
                        <StyledForm>
                            <h1>{headingTitle}</h1>
                            <Field
                                type="text"
                                name="title"
                                placeholder="Title"
                                component={Input}
                                style={{
                                    background: 'var(--color-mainLighter',
                                    borderRadius: '10px'
                                }}
                            />
                            <Field
                                type="text"
                                name="content"
                                placeholder="Contnt"
                                component={TextArea}
                                style={{background: 'var(--color-mainLighter'}}

                            />
                            <Button 
                                disabled={!isValid || setSubmitting} 
                                type="submit"
                            >
                                {loading ? <Loading/> : buttonTitle}
                            </Button>
                        </StyledForm>
                    )
                }
            </Formik>
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        error: state.news.error,
        loading: state.news.loading
    }
}


export default connect(mapStateToProps)(NewsForm);