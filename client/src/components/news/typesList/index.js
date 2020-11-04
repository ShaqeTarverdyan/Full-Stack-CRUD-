import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../UI/Button';
import { getNewsList } from '../../../store/actions/newsActions';
import { Link } from 'react-router-dom';
import Loading from '../../loader';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const TypesList = ({ types, getNewsList}) => {

    return (
        <Wrapper>
            <Link
                to={{
                    pathname: "/news",
                }}
            >
                <Button 
                    style={{width: '120px', margin: '1rem'}}
                    onClick={() => getNewsList()}
                >
                    All News
                </Button>
            </Link>

            {
                types.length > 0 ? 
                types.map(type => (
                    <Link
                        key={type.id}
                        to={{
                            pathname: "/news",
                            search: `?typeId=${type.id}`,
                        }}
                    >
                        <Button 
                            style={{width: '120px', margin: '1rem'}}
                            onClick={() => getNewsList(type.id)}
                        >
                            {type.name}
                        </Button>
                    </Link>

                )): <Loading/>
            }
        </Wrapper>
    )
};

const mapstateToProps = state => {
    return {
        types: state.news.types
    }
}
const mapDispatchToState = dispatch => {
    return {
        getNewsList: (type) => dispatch(getNewsList(type))
    }
}

export default connect(mapstateToProps, mapDispatchToState)(TypesList);