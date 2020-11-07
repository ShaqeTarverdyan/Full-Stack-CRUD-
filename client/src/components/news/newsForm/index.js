import React, { useEffect, useState } from 'react';
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

import FileReader from '../fileReader';
import { useSelector, useDispatch } from 'react-redux';

import { StyledForm, StyledOption, StyledSelect, Container, FormWrapper} from '../../../generalStyles';

const FileWrapper = styled.div`
    position: relative;
    text-align: center;
    box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.69);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text);
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: -9px;
  right: -9px;
  color: #fff;
  background: #ff4081;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;
  line-height: 30px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const NewsForm = ({ 
        formSubmitFunction, 
        buttonTitle, 
        headingTitle,
        initialValues,
        isGetingImageUrl,
        validationSchema,
        deleteImageFromBackend,
        deleteFileFromBackend,
        imageLoading
    }) => {

    const error = useSelector(state => state.news.error);
    const loading = useSelector(state => state.news.loading);
    const types = useSelector(state => state.news.types);
    const dispatch = useDispatch();
    const defaultValues = Object.keys(initialValues).length > 0 && initialValues;
    const newsId = initialValues.id;
    let history = useHistory();
    if(error) {
        return <ErrorPage/>
    }
    return (
        <Container>
            <FormWrapper>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    onSubmit={async(values, {setSubmitting}) => {
                        await dispatch(formSubmitFunction(values, history));
                        setSubmitting(false)
                    }}
                >
                    {
                        ({isValid, setSubmitting, FieldValue, setFieldValue,values, ...props}) => (
                            <>
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
                                        <>
                                            {
                                                initialValues.images.map(file => (
                                                    <FileReader
                                                        key={file.id}
                                                        deleteFile={deleteImageFromBackend}
                                                        newsId={newsId}
                                                        file={file}
                                                        imageLoading={imageLoading}
                                                    />
                                                ))
                                            }
                                            {
                                                initialValues.files.length > 0 && 
                                                initialValues.files.map(file => (
                                                    <FileReader 
                                                        key={file.id}
                                                        deleteFile={deleteFileFromBackend}
                                                        newsId={newsId}
                                                        path={file.path}
                                                        fileName={file.originalname}
                                                    />
                                                ))
                                            }
                                            {
                                                values.files.length > 0 ? 
                                                values.files.map(file => (
                                                    <>
                                                        {
                                                            file.type && file.type.startsWith("image") &&  
                                                            <FileReader 
                                                                deleteFile={() => {
                                                                    setFieldValue("files", values.files.filter(item => item.lastModified !== file.lastModified));
                                                                }}
                                                                file={file}
                                                            />
                                                        }
                                                        {
                                                            file.type && file.type.startsWith("application") && 
                                                            <FileReader 
                                                                deleteFile={() => {
                                                                    setFieldValue("files", values.files.filter(item => item.lastModified !== file.lastModified));
                                                                }}
                                                                fileName={file.name}
                                                                path={file.path}
                                                            />
                                                        }
                                                    </>
                                                )): <div/>

                                            }
                                        </>:
                                        values.files && 
                                        values.files.length > 0 ?
                                        values.files.map(file => (
                                            file.type && file.type.startsWith("image") ? 
                                            <FileReader 
                                                key={file.id}
                                                deleteFile={() => {
                                                    setFieldValue("files", values.files.filter(item => item.lastModified !== file.lastModified));
                                                }}
                                                file={file}
                                            /> : 
                                            <FileReader 
                                                key={file.id}
                                                deleteFile={() => {
                                                    setFieldValue("files", values.files.filter(item => item.lastModified !== file.lastModified));
                                                }}
                                                fileName={file.name}
                                                path={file.path}
                                            />
                                                
                                        )): <div/>
                                    }
                                </div>
                                <Button 
                                    disabled={!isValid || setSubmitting} 
                                    type="submit"
                                >
                                    {loading ? <Loading isWhite={true}/> : buttonTitle}
                                </Button>
                            </StyledForm>
                            </>
                        )
                    }
                </Formik>
            </FormWrapper>
        </Container>
    )
}


export default NewsForm;

                           