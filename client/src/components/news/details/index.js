import React, {useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getTypes,deleteNews, getCurrentNews } from '../../../store/actions/newsActions';
import { getAdmin } from '../../../store/actions/authActions';
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
    display: grid;
    grid-gap: 1rem;
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

const H3 = styled(H1)`
    font-size: 2rem
`;
const Actions = styled.div`
    display: flex;
    align-self: flex-end;
`;

const File = styled.div`
    color: var(--color-mainDark);
    font-size: 17px;
    font-weight: bolder
`;

const FileWrapper = styled.div`
    display: flex
`;

const Description = styled.div`
    border: 1px solid var(--color-text);
    border-radius: 1rem;
    padding: 1rem
`;

const AdminDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1.8rem;
    padding: 1rem

`;

const AdminDetail = styled.div`
    border-bottom: 1px dotted var(--color-text)
`


const NewsDetails = ({ getTypes, currentNews, deleteNews, getCurrentNews, showModal, admin, getAdmin }) => {
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentNewsId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        getCurrentNews(currentNewsId);
        getTypes();
        getAdmin(localStorage.getItem('admin_id'))
    },[currentNewsId, getTypes, getCurrentNews, getAdmin]);
    const signedInAdminsNews = admin && admin.news ? admin.news.find(item => item.id == currentNews.id) : '';

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
                    <Description>
                        <H3>{currentNews.admins && 'Attached Admins'}</H3>
                        <AdminDetails>
                            {
                                currentNews.admins && 
                                currentNews.admins.length ? 
                                currentNews.admins.map(admin => (
                                    <AdminDetail>
                                        <P>First Name: {admin.firstname}</P>
                                        <P>Last Name: {admin.lastname}</P>
                                        <P>Role: {admin.AdminsNews.role}</P>
                                    </AdminDetail>
                                )): ''
                            }
                        </AdminDetails>
                    </Description>
                    <FileWrapper>
                        {
                            currentNews.files? 
                            currentNews.files.map(file => (
                                <File>
                                    <a href={`${process.env.REACT_APP_URL}/${file.path}`} target="_blank">{file.originalname}</a>
                                </File>
                            )): <div/>
                        }
                    </FileWrapper>
                    {
                        signedInAdminsNews ? 
                        <Actions>
                            <Button style={Buttonstyle} onClick={showModal}>Attach Admin</Button> :
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
                        </Actions> : 
                        <div/>
                    }
                </Details>
            </Wrapper>
            <Modale>
                <AttachAdmin
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
        admin: state.auth.admin
    }
}
const mapDispatchToState = dispatch => {
    return {
        getTypes:() => dispatch(getTypes()),
        deleteNews: (newsId, history) => dispatch(deleteNews(newsId, history)),
        getCurrentNews: (id) => dispatch(getCurrentNews(id)),
        showModal: () => dispatch(showModal()),
        getAdmin:(id) => dispatch(getAdmin(id))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(NewsDetails);