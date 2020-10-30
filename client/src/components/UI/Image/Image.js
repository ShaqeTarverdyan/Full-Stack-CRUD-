import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  object-fit: contain;
	margin: auto;
	background: lightgray;
`;

const Image = (props) => {
  const url= props.isGetingImageUrl ? 
    process.env.REACT_APP_URL+ '/'+props.imageUrl.path : 
    props.imageUrl && URL.createObjectURL(props.imageUrl)

  return (
    <div>
     <button onClick={props.clearImage}>clear</button>
      <StyledImage
        style={{
          backgroundImage: `url("${url}")`
        }}
      />
    </div>
    )
}

export default Image;