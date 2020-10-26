import React from 'react';
import styled from 'styled-components';
import Input from '../Input';

const StyledImage = styled.img`
    width: 100px;
    height: 100px;
    background-repeat: no-repeat;
`;

const Image = props => (
  <StyledImage
    style={{
      backgroundImage: `url("${props.imageUrl}")`,
      backgroundSize: props.contain ? 'contain' : 'cover',
      backgroundPosition: props.left ? 'left' : 'center'
    }}
  />
);

const ImageInput = (props) => {
  console.log('image value', props.field.value)
  return (
    <>
      <Input {...props}/>
      <Image imageUrl={props.field.value}/>
    </>
    )
}

export default ImageInput;