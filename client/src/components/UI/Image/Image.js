import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
`;

const Image = (props) => {
  const url= props.isGetingImageUrl ? 
    process.env.REACT_APP_URL+ '/'+props.imageUrl.path : 
    props.imageUrl && URL.createObjectURL(props.imageUrl)

  return (
    <StyledImage
      style={{
        backgroundImage: `url("${url}")`,
        backgroundSize: props.contain ? 'contain' : 'cover',
        backgroundPosition: props.left ? 'left' : 'center',
        width: '100%'
      }}
    />
    )
}

export default Image;