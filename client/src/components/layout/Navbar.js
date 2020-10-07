import React from 'react';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

const Navbar = () => {
    return(
        <div>
            <SignedOutLinks/>
            <SignedInLinks/>
        </div>
    )
}

export default Navbar;