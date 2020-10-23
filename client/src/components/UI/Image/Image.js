import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.image`
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
`;


const Image = props => (
  <StyledImage
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? 'contain' : 'cover',
      backgroundPosition: props.left ? 'left' : 'center'
    }}
  />
);

export default Image;