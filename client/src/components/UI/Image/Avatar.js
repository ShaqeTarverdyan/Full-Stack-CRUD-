import React from 'react';
import styled from 'styled-components';

import Image from './Image';
const Avatar = styled.avatar`
    width: 10rem;
    height: 10rem;
    margin: 0.5rem auto;
    border-radius: 50%;
    overflow: hidden;
`

const avatar = props => (
  <Avatar
    style={{ width: props.size + 'rem', height: props.size + 'rem' }}
  >
    <Image imageUrl={props.image} />
  </Avatar>
);
export default avatar;