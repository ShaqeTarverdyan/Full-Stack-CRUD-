import React from 'react';
import styled from 'styled-components';
import { Error } from './Input'


const TextareaWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 3.5rem;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
	resize: none;
    border: 0.1rem solid lightgray;
    border-radius: 1rem;
    min-height: 10rem;
    box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
	padding: 1.2rem 2rem;
	width: 100%;
	background-color: var(--color-mainLight);
	color: var(--color-white);
	font-weight: 500;
	font-size: 1.2rem;
	border: none;
	&::placeholder {
	color: var(--color-white);
	opacity: 0.5
	}
`;

const TextArea = ({ field, form: { touched, errors }, ...props }) => {
	return (
		<TextareaWrapper>
			<StyledTextarea {...field} {...props}/>
			<Error show={errors[field.name] && touched[field.name]}>
		    	{errors[field.name]}
		    </Error>
		</TextareaWrapper>
	)
}


export default TextArea