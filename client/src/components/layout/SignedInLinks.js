import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/actions/authActions';
import { getAdmins } from '../../store/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';


export const UL = styled.ul`
    display: flex;
    text-decoration: none;
    list-style-type: none;
    align-items: center;
`;

export const LI = styled.li``;

export const StyledNavLink = styled(NavLink)`
    color: white;
    font-size: initial;
    margin: 0 2rem;
    &.active {
        padding: 1rem 0;
    }
`;

const SignedInLinks = () => {
    const admin_id = useSelector(state => state.auth.admin_id);
    const admins = useSelector(state => state.auth.admins);
    const dispatch = useDispatch();
    const curentAdmin = admins.filter(admin => admin.id == admin_id)[0];
    useEffect(() => {
        dispatch(getAdmins())
    },[getAdmins])
    return(
        <UL>
            <LI><StyledNavLink to="/news">Home</StyledNavLink></LI>
            <LI><StyledNavLink to="/adminsNews"> My News</StyledNavLink></LI>
            <LI><StyledNavLink to="/addNews">Add News</StyledNavLink></LI>
            <LI><StyledNavLink to="/profile">My profile</StyledNavLink></LI>
            <LI><StyledNavLink to="/admins">Admins List</StyledNavLink></LI>
            {
                curentAdmin  && 
                curentAdmin.role === 'super' && 
                <LI><StyledNavLink to="/invitation">invite NewAdmin</StyledNavLink></LI>
            }
            <LI><StyledNavLink to="/" onClick={() => dispatch(logOut())}>Log Out</StyledNavLink></LI>
        </UL>
    )
}

export default SignedInLinks;