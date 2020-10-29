import React from 'react';
import styled from 'styled-components';
//import ImageUploader from "react-images-upload";

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
      // <ImageUploader
      //   withIcon={false}
      //   withPreview={true}
      //   buttonText="Choose images"
      //   onChange={props.onDrop}
      //   imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      //   maxFileSize={5242880}
      // />
    )
}

export default Image;