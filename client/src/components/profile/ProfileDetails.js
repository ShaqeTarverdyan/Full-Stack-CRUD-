import React, { useEffect } from 'react';
import { getAdmin  } from '../../store/actions/authActions';
import  { Link } from 'react-router-dom';
import Loading from '../loader';
import styled from 'styled-components';
import Button from '../UI/Button';
import { useSelector, useDispatch } from 'react-redux';

const StyledProfile = styled.div`
    width: 65%;
    margin: 0 auto;
    border: 1px solid grey;
    display: grid;
    text-align: center;
    padding: 10px;
    margin: 10% auto
`;
const UL = styled.ul`
    list-style-type: none;
`;
const LI= styled.li`
    border-bottom: 1px solid var(--color-mainDark);
    font-size: 2rem;
    color: var(--color-text);
    width: 80%;
    margin: auto;
`;
const ProfileDetails = () => {
    const admin_id = useSelector(state => state.auth.admin_id);
    const admin = useSelector(state => state.auth.admin);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdmin (admin_id))
    }, [getAdmin , admin_id]);

    return (
        <StyledProfile>
            {
                admin ? 
                <UL>
                    <LI>First Name: {admin.firstname}</LI>
                    <LI>Last Name: {admin.lastname}</LI>
                    <LI>email: {admin.email}</LI>
                    <LI>Role: {admin.role}</LI>
                </UL> : 
                <Loading/>
            }
            <Link to={`/edit-profile/${admin.id}`}>
                <Button>Edit</Button>
            </Link>
        </StyledProfile>

    )
};


export default ProfileDetails;