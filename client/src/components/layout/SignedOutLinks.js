import React from 'react';
import { UL, LI, StyledNavLink } from './SignedInLinks'; 

const SignedOutLinks = () => {
    return(
        <UL>
            <LI><StyledNavLink to="/logIn">Log In</StyledNavLink></LI>
            <LI><StyledNavLink to="/signUp">Sign Up</StyledNavLink></LI>
        </UL>
    )
}

export default SignedOutLinks;