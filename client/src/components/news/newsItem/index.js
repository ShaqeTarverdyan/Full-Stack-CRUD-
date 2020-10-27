import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../UI/Button';

const Styleditem = styled.div`
    border: 1px solid var(--color-mainDark);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.2rem;
    margin: 2% 10%;
    
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

const NewsItem = ({news}) => {
    return(
        <Styleditem>
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