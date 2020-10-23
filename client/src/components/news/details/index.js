import React, {useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getCurrentNews, getTypes,deleteNews  } from '../../../store/actions/newsActions';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import  { Wrapper } from '../../../generalStyles';
import Button from '../../UI/Button';


const Details = styled.div`
    border: 1px solid var(--color-mainDark);

`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
`
const NewsDetails = ({ getCurrentNews, getTypes, currentNews, deleteNews}) => {
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        getCurrentNews(currentNewsId);
        getTypes()
    },[currentNewsId, getCurrentNews, getTypes]);

    return(
        <Wrapper>
            <Details>
                <div>title:  {currentNews.title}</div>
                <div>content:  {currentNews.content}</div>
                <Actions>
                    <Link 
                        to={{
                            pathname:"/update-news/"+currentNews.id,
                            aboutProps: {
                                currentNews: currentNews
                            }
                        }}
                    >
                        <Button>update</Button>
                    </Link>
                    <Button  onClick={() => deleteNews(currentNews.id, history)}>delete</Button>
                </Actions>

            </Details>
        </Wrapper>

    )
}

const mapStateToProps = state => {
    return {
        loading: state.news.loading,
        error: state.news.error,
        currentNews: state.news.currentNews,
    }
}
const mapDispatchToState = dispatch => {
    return {
        getCurrentNews: (id) => dispatch(getCurrentNews(id)),
        getTypes:() => dispatch(getTypes()),
        deleteNews: (newsId, history) => dispatch(deleteNews(newsId, history))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(NewsDetails);