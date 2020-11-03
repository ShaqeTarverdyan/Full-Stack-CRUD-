import React from 'react';
import styled from 'styled-components';


const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Label = styled.label`
  padding: 10px;
  background: #edf2f6;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: inherit;
  box-shadow: 0 0 8px 2px rgba(0,0,0,.1);
  border: 1px solid #d0dbe4;
`;



const Image = ({isGetingImageUrl, imageUrl}, ...props) => {
  const url= isGetingImageUrl ? 
    process.env.REACT_APP_URL+ '/'+imageUrl.path : 
    imageUrl && URL.createObjectURL(imageUrl)
  return (
    <Label>
      <StyledImage src={url}/>
    </Label>
    )
}

export default Image;