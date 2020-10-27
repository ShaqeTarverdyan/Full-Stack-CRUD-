import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

import { connect } from 'react-redux';
import { setAdminIdinStore } from '../../store/actions/authActions';

const Nav = styled.nav`
    width: 100%;
    padding: 3rem 5rem;
    background: var(--color-mainLight)
`;
const Container = styled.div`
    display: flex;
    justify-content: space-between;

`;

const Navbar = ({ admin_id, setAdminIdinStore}) => {
    useEffect(() => {
        setAdminIdinStore()
    }, [setAdminIdinStore, admin_id])
    return(
        <Nav>
            <Container>
                {
                    admin_id ? <SignedInLinks/> : <SignedOutLinks/>
                }
            </Container>
        </Nav>
    )
}

const mapStateToProps = state => {
    return {
        admin_id: state.auth.admin_id
    }
}

const mapDispatchToState = dispatch => {
    return {
        setAdminIdinStore: () => dispatch(setAdminIdinStore())
    }
}
export default connect(mapStateToProps, mapDispatchToState)(Navbar);