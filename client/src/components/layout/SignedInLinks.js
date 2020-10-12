import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


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

const Initials = styled(NavLink)`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: white;
	color: var(--color-mainLight);
	padding: 1rem;
    font-weight: bolder;
    font-size: 1.3rem;
`;

const SignedInLinks = () => {
    return(
        <UL>
            <LI><StyledNavLink to="/news">News</StyledNavLink></LI>
            <LI><StyledNavLink to="/addNews">Add News</StyledNavLink></LI>
            <LI><Initials to="/adminDetails">ST</Initials></LI>
            <LI><StyledNavLink to="/">Log Out</StyledNavLink></LI>
        </UL>
    )
}

export default SignedInLinks;