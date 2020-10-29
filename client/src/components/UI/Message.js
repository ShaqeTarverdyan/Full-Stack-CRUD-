import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  font-weight: 300;
  font-size: 1.5rem;
  color: ${({ error, success }) => {
    if (error) return 'var(--color-errorRed)';
    if (success) return 'var(--color-success)';
    else return 'var(--color-text)';
  }};
  opacity: ${({ show }) => (show ? '1' : '0')};
  visibility: ${({ show }) => (show ? 'visibile' : 'hidden')};
  text-align: center;
  transition: all 0.2s;
  margin: 1rem;
`;

const Message = ({ children, error, success, show }) => {
  return (
    <P error={error} success={success} show={show}>
      {children}
    </P>
  );
};

export default Message;