import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Image from '../../UI/Image/Image';

import Input from '../../UI/Input';
import Button from '../../UI/Button';

import TextArea from '../../UI/TextArea';
import ErrorPage from '../../errorPage';
import Loading from '../../loader';

import { StyledForm, StyledOption, StyledSelect, Container, FormWrapper} from '../../../generalStyles';

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
        initialValues,
        types,
        isGetingImageUrl
    }) => {
    const defaultValues = Object.keys(initialValues).length > 0 && initialValues;
    console.log('defaultValues', defaultValues)

    let history = useHistory();
    if(error) {
        return <ErrorPage/>
    }
    return (
        <Container>
            <FormWrapper>
                <Formik
                    initialValues={defaultValues}
                    // validationSchema={}
                    onSubmit={async(values, {setSubmitting}) => {
                        console.log('values', values)
                        await formSubmitFunction(values, history);
                        setSubmitting(false)
                    }}
                >
                    {
                        ({isValid, setSubmitting, FieldValue, setFieldValue,values, ...props}) => (
                            <StyledForm encType="multipart/form-data">
                                <h1>{headingTitle}</h1>
                                <Field
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    component={Input}
                                />
                                <Field
                                    type="file"
                                    name="files"
                                    multiple
                                    component={Input}
                                    onChange={(event) =>{
                                        console.log(event.currentTarget.files[0])
                                        setFieldValue("files", [...values.files, event.currentTarget.files[0]]);
                                    }}
                                    value={FieldValue}  
                               />
                               {
                                defaultValues.images.map(image => (
                                     <Field
                                        as={Image}
                                        isGetingImageUrl={isGetingImageUrl}
                                        imageUrl={image}
                                    />
                                ))
                               }
                                <Field
                                    type="text"
                                    name="content"
                                    placeholder="Contnt"
                                    component={TextArea}

                                />
                                <Field
                                    as={StyledSelect}
                                    name="typeId"
                                >
                                    <StyledOption value="" >Choose propriate type</StyledOption>
                                    {
                                        types.map(({id, name, value}) => (
                                            <StyledOption key={id} value={id}>{name}</StyledOption>
                                        ))
                                    }
                                </Field>
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
            </FormWrapper>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        error: state.news.error,
        loading: state.news.loading,
        types: state.news.types
    }
}


export default connect(mapStateToProps)(NewsForm);

                               //  {
                               //      values.files.length > 0 ?
                               //      values.files.map(file => (
                               //          <Field
                               //              as={Image}
                               //              isGetingImageUrl={isGetingImageUrl}
                               //              imageUrl={file}
                               //          />
                               //      )): ''
                               // }