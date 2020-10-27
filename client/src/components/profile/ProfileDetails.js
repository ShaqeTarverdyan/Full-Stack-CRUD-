import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmin  } from '../../store/actions/authActions';
import  { Link } from 'react-router-dom';
import Loading from '../loader';
import styled from 'styled-components';
import Button from '../UI/Button'

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
const ProfileDetails = ({ getAdmin , admin_id, admin}) => {
    useEffect(() => {
        getAdmin (admin_id)
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


const mapStateToProps = state => {
    return {
        admin_id: state.auth.admin_id,
        admin: state.auth.admin
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdmin : (admin_id) => dispatch(getAdmin (admin_id))
    }
}
export default connect(mapStateToProps,mapDispatchToState)(ProfileDetails);