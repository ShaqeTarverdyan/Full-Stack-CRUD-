import React from 'react';
import { Formik, Field } from 'formik';

import { useHistory } from 'react-router-dom';

import Input from '../../UI/Input';
import Button from '../../UI/Button';
import SelectComponent from '../../UI/Select';

import TextArea from '../../UI/TextArea';
import ErrorPage from '../../errorPage';
import Loading from '../../loader';

import FileReader from '../fileReader';
import { useSelector, useDispatch } from 'react-redux';
import {generateCustomError } from '../../../helpers/generateCustomError';

import { StyledForm, Container, FormWrapper} from '../../../generalStyles';

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
    const errormessages = useSelector(state => state.news.errormessages);
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
                        ({ isValid, setSubmitting, FieldValue, setFieldValue,values }) => (
                            <>
                            <StyledForm encType="multipart/form-data">
                                <h1>{headingTitle}</h1>
                                <Field
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    component={Input}
                                    serverError={generateCustomError(errormessages,"title")}
                                />
                                <Field
                                    type="text"
                                    name="content"
                                    placeholder="Contnt"
                                    component={TextArea}
                                    serverError={generateCustomError(errormessages,"content")}

                                />
                                <Field
                                    component={SelectComponent}
                                    name="typeId"
                                    serverError={generateCustomError(errormessages,"typeId")}
                                    types={types}
                                    title="Choose propriate type"
                                />
                                
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

                           