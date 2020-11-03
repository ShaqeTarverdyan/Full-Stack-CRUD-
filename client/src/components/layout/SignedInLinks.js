import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';
import { getAdmins } from '../../store/actions/authActions';


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

const SignedInLinks = ({ logOut, admins,admin_id, getAdmins }) => {
    const curentAdmin = admins.filter(admin => admin.id == admin_id)[0];
    useEffect(() => {
        getAdmins()
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
            <LI><StyledNavLink to="/" onClick={logOut}>Log Out</StyledNavLink></LI>
        </UL>
    )
}

const mapstateToProps = state => {
    return {
        admin_id: state.auth.admin_id,
        admins: state.auth.admins
    }
}
const mapDispatchToState = dispatch => {
    return {
        logOut: () => dispatch(logOut()),
        getAdmins: () => dispatch(getAdmins())
    }
}
export default connect(mapstateToProps,mapDispatchToState)(SignedInLinks);