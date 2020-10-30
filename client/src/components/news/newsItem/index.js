import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../UI/Button';

const Styleditem = styled.div`
    border: 1px solid var(--shadow);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.2rem;
    margin: 2% 10%;
    background:${({ isChecked }) => (isChecked ? 'var(--color-mainLighter)' : '')};
    box-shadow: ${({ isChecked }) => (isChecked ? '1px 2px 10px 0px rgba(0,0,0,0.69)' : '')};;
    
`;

export const Buttonstyle = {
    "margin": "0",
    "border": "var(--color-mainLight)",
    "background": "none",
    "color": "var(--color-main)",
    "boxShadow": "none"
}

const Title = styled.p`
    font-size: 2rem;
    color: var(--color-text)
`;

const NewsItem = ({news, onCheck}) => {
    const [isChecked, setIsChecked] = useState(false);
    
    const handleOnCheck = (news) => {
        onCheck(news);
        setIsChecked(!isChecked);
    }
    return(
        <Styleditem onClick={() => handleOnCheck(news)} isChecked={isChecked}>
            <Title>{news.title}</Title>
            <Link
                to={{
                    pathname:"/news-details/"+news.id,
                    aboutProps: {
                        news: news
                    }
                }}
            >
                <Button style={Buttonstyle}>Details</Button>
            </Link>

        </Styleditem>
    )
}


export default NewsItem;