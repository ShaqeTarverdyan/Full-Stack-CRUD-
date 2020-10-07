import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 3.5rem;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 1.2rem 2rem;
  width: 100%;
  background-color: var(--color-mainLight);
  color: var(--color-white);
  font-weight: 500;
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid var(--color-white);
  &::placeholder {
    color: var(--color-white);
    opacity: 0.5
  }
`;

export const Error = styled.div`
  color: var(--color-errorRed);
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: translateY(${({ show }) => (show ? '20px' : '10px')});
  transition: all 0.1s;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 1.2rem;
  letter-spacing: 1px;
`;

const Input = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </Error>
    </InputWrapper>
  );
};

export default Input;