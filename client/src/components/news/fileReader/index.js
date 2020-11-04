import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import Image from '../../UI/Image/Image';
import Loading from '../../loader';

export const FileWrapper = styled.div`
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

export const DeleteIcon = styled.div`
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


const FileReader = ({ deleteFile, newsId, file, imageLoading, fileName, path }) => {
    const filePath = file ? file.path : path;
    return (
        <FileWrapper>
            <DeleteIcon
                onClick={() => {
                    deleteFile(filePath, newsId)
                }}
            >x</DeleteIcon>
            {
                imageLoading ? 
                <Loading/> : 
                file ?
                <Field
                    as={Image}
                    imageUrl={file}
                />: 
                fileName
            }
        </FileWrapper>
    )
}

export default FileReader;