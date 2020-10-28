import React, {useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getCurrentNews, getTypes,deleteNews, getCurrentImage  } from '../../../store/actions/newsActions';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import  { Wrapper } from '../../../generalStyles';
import Button from '../../UI/Button';
import Image from '../../UI/Image/Image';


const Details = styled.div`
    border: 1px solid var(--color-mainDark);
    display: flex;
    flex-direction: column;
    padding: 1rem 1.2rem;
    align-items: center;
    margin: 0.5rem;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
`;

const Section = styled.section`
    display: grid;
    grid-template-columns: 20% 80%;
    grid-column-gap: 1rem;
    width: 100%;
    height: auto;
`;

const P = styled.p`
    font-size: 17px;
    text-align: start;
    color: var(--color-text)
`
const Actions = styled.div`
    display: flex;
    align-self: flex-end;
`
const NewsDetails = ({ getCurrentNews, getTypes, currentNews, deleteNews, getCurrentImage}) => {
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);
    const imageId = Object.keys(currentNews).length > 0 ? currentNews.imageId : null
    useEffect(() => {
        getCurrentNews(currentNewsId);
        getTypes()
    },[currentNewsId, getCurrentNews, getTypes]);

    useEffect(() => {
        if(imageId !== null) {
            getCurrentImage(imageId)
        } 
    }, [imageId, getCurrentImage])
    return(
        <Wrapper>
            <Details>
                <h1>{currentNews.title}</h1> 
                <Section>
                    {
                        currentNews.image && 
                        <Image 
                            imageUrl={currentNews && currentNews.image}
                            isGetingImageUrl={true}
                        />
                    }
                    <P>{currentNews.content}</P>
                </Section>
                
                <Actions>
                    <Link 
                        to={{
                            pathname:'/attach-new-admin-to-user/?newsId='+currentNews.id,
                        }}
                    >
                        <Button style={Buttonstyle}>Attach Admin</Button>
                    </Link>
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
    "box-shadow": "none",
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
        getCurrentNews: (id) => dispatch(getCurrentNews(id)),
        getTypes:() => dispatch(getTypes()),
        deleteNews: (newsId, history) => dispatch(deleteNews(newsId, history)),
        getCurrentImage:(id) => dispatch(getCurrentImage(id))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(NewsDetails);