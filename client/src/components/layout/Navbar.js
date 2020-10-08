import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

const Nav = styled.nav`
    width: 100%;
    padding: 3rem 5rem;
    background: var(--color-mainLight)
`;
const Container = styled.div`
    display: flex;
    justify-content: space-between;

`;
const LogoWraper = styled(Link)`
    font-size: 3rem;
    font-weight: bold;
    color: var(--color-mainDark)

`;

const Navbar = () => {
    return(
        <Nav>
            <Container>
                <LogoWraper to="/">News</LogoWraper>
                <SignedOutLinks/>
                <SignedInLinks/>
            </Container>
        </Nav>
    )
}

export default Navbar;