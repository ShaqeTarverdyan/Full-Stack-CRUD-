import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';


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

const SignedInLinks = ({ logOut, admin }) => {
    return(
        <UL>
            <LI><StyledNavLink to="/news">News</StyledNavLink></LI>
            <LI><StyledNavLink to="/addNews">Add News</StyledNavLink></LI>
            <LI><StyledNavLink to="/profile">My profile</StyledNavLink></LI>
            {admin.role === 'super' && <LI><StyledNavLink to="/admins">Admins List</StyledNavLink></LI>}
            <LI><StyledNavLink to="/" onClick={logOut}>Log Out</StyledNavLink></LI>
        </UL>
    )
}

const mapstateToProps = state => {
    return {
        admin: state.auth.admin
    }
}
const mapDispatchToState = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}
export default connect(mapstateToProps,mapDispatchToState)(SignedInLinks);