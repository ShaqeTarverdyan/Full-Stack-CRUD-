import React from 'react';
import styled from 'styled-components';
import Button from '../../UI/Button';
import { getNewsList } from '../../../store/actions/newsActions';
import { Link } from 'react-router-dom';
import Loading from '../../loader';
import { useSelector, useDispatch } from 'react-redux';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const TypesList = () => {
    const types = useSelector(state => state.news.types);

    const dispatch = useDispatch(); 
    return (
        <Wrapper>
            <Link
                to={{
                    pathname: "/news",
                }}
            >
                <Button 
                    style={{width: '120px', margin: '1rem'}}
                    onClick={() => dispatch(getNewsList())}
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
                            onClick={() => dispatch(getNewsList(type.id))}
                        >
                            {type.name}
                        </Button>
                    </Link>

                )): <Loading/>
            }
        </Wrapper>
    )
};
export default TypesList;