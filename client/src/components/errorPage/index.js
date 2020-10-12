import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div``;


const ErrorPage = ({children}) => {
    return (
    <ErrorWrapper>{children}</ErrorWrapper>
    )
}

export default ErrorPage;