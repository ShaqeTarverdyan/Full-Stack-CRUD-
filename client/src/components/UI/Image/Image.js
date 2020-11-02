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
  position: relative;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: -9px;
  right: -9px;
  color: #fff;
  background: #ff4081;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;
  line-height: 30px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Image = ({isGetingImageUrl, imageUrl}, ...props) => {
  const url= isGetingImageUrl ? 
    process.env.REACT_APP_URL+ '/'+imageUrl.path : 
    imageUrl && URL.createObjectURL(imageUrl)
  return (
    <Label style={{position: 'relative'}}>
      <StyledImage src={url}/>
    </Label>
    )
}

export default Image;