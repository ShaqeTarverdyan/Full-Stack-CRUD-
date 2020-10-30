import React, {useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getTypes,deleteNews, getCurrentNews } from '../../../store/actions/newsActions';
import { showModal } from '../../../store/actions/appActions';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import  { Wrapper } from '../../../generalStyles';
import Button from '../../UI/Button';
import Image from '../../UI/Image/Image';
import Modale from '../../Modale';
import AttachAdmin from '../../admins/attachAdmin';


const Details = styled.div`
    border: 1px solid var(--color-mainDark);
    display: flex;
    flex-direction: column;
    padding: 1rem 1.2rem;
    margin: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
`;

export const ImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    width: 100%;
    height: 250px;

`;

const P = styled.p`
    font-size: 17px;
    text-align: start;
    color: var(--color-text)
`;

const H1 = styled.h1`
    text-align: center;
    padding: 3rem 0.2rem;
    font-size: 4rem;
    color: var(--color-mainDark)
`;
const Actions = styled.div`
    display: flex;
    align-self: flex-end;
`;

const Description = styled.div`
`;

const NewsDetails = ({ getTypes, currentNews, deleteNews, getCurrentNews, showModal }) => {
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        getCurrentNews(currentNewsId);
        getTypes()
    },[currentNewsId, getTypes, getCurrentNews]);

    return(
        <>
            <Wrapper>
                <Details>
                    <H1>{currentNews.title}</H1> 
                    <ImagesWrapper>
                        {
                            currentNews.images ? 
                            currentNews.images.map(image => (
                                <Image 
                                    key={image.id}
                                    imageUrl={image}
                                    isGetingImageUrl={true}
                                />
                            )): <div></div>
                        }
                    </ImagesWrapper>
                    <Description>
                        <P>{currentNews.content}</P>
                    </Description>
                    
                    <Actions>
                        <Button style={Buttonstyle} onClick={showModal}>Attach Admin</Button>
                        <Link 
                            to={{
                                pathname:"/update-news/"+currentNews.id,
                                aboutProps: {
                                    currentNews: currentNews
                                }
                            }}
                        >
                            <Button style={Buttonstyle}>Update</Button>
                        </Link>
                        <Button  
                            onClick={() => deleteNews(currentNews.id, history)}
                            style={Buttonstyle}
                        >
                            Delete
                        </Button>
                    </Actions>

                </Details>
            </Wrapper>
            <Modale>
                <AttachAdmin i
                    isForSendPdf={false}
                    newsId={currentNews.id}
                />
            </Modale>
        </>

    )
}
const Buttonstyle = {
    "borderRadius": "10px",
    "padding": "0.8rem",
    "fontWeight": "500",
    "margin": "0 5px",
    "background": "none",
    "color": "var(--color-main)",
    "border": "var(--color-main)",
    "boxShadow": "none",
    "fontSize": "16px",
    "width": "max-content"
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
        getTypes:() => dispatch(getTypes()),
        deleteNews: (newsId, history) => dispatch(deleteNews(newsId, history)),
        getCurrentNews: (id) => dispatch(getCurrentNews(id)),
        showModal: () => dispatch(showModal()),
    }
}

export default connect(mapStateToProps, mapDispatchToState)(NewsDetails);