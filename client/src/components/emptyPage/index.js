import React from 'react';
import emptyImg from './emptyPage.png';

const EmptyPage = () => {
    return (
        <img 
            src={emptyImg} 
            style={{
                width: '50%', 
                margin: 'auto',     
                display: "flex",
                padding: "3rem"
            }}
        />
    )
}

export default EmptyPage;