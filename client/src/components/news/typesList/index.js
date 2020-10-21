import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../UI/Button'

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const TypesList = ({ types, getFilteredNews}) => {

    return (
        <Wrapper>
            <Button 
                style={{width: '120px', margin: '1rem'}}
                onClick={() => getFilteredNews('all')}
            >All News</Button>
            {
                types.length > 0 ? 
                types.map(type => (
                    <Button 
                        key={type.id}
                        style={{width: '120px', margin: '1rem'}}
                        onClick={() => getFilteredNews(type.id)}
                    >{type.name}</Button>
                )): <div>loading</div>
            }
        </Wrapper>
    )
};

const mapstateToProps = state => {
    return {
        types: state.news.types
    }
}

export default connect(mapstateToProps)(TypesList);