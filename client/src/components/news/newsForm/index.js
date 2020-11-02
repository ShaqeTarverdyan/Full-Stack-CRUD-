import React, { useEffect, useState } from 'react';
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

const ImageWrapper = styled.div`
    text-align: center;
    box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.69);
    height: 80px;
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
    const dataFiles = initialValues.images;
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
                                
                                <Field
                                        type="file"
                                        name="files"
                                        multiple
                                        component={Input}
                                        onChange={(event) =>{
                                            console.log(event.currentTarget.files[0], 'values',values)
                                            setFieldValue("files", [...values.files, event.currentTarget.files[0]]);
                                        }}
                                        value={FieldValue}  
                                />
                                <div style={{
                                        width: '100%', 
                                        minHeight: '10px',
                                        display: 'grid', 
                                        gridTemplateColumns: '25% 25% 25% 25%',
                                        gridGap: '2%'
                                    }}
                                >
                                    {
                                        isGetingImageUrl? 
                                        dataFiles.map(file => (
                                            <Field
                                                key={file.id}
                                                as={Image}
                                                isGetingImageUrl={isGetingImageUrl}
                                                imageUrl={file}
                                            />
                                        )):
                                        values.files.length > 0 ?
                                        values.files.map(file => (
                                        <ImageWrapper>
                                            <Field
                                                key={file.id}
                                                as={Image}
                                                isGetingImageUrl={isGetingImageUrl}
                                                imageUrl={file}
                                            />
                                        </ImageWrapper>
                                        )): ''
                                    }
                                </div>
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

                           