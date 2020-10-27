import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmin } from '../../../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import PanelAdminActions from '../panelAdminActions';
import Loading from '../../loader';
import styled from 'styled-components';
import { Wrapper } from '../../../generalStyles';


const StyledDetails = styled.div`
    width: 100%
`;
const P = styled.p`
    text-align: center;
    font-size: 2rem;
    border-bottom: 1px solid var(--color-main);
    color: var(--color-text)
`;
const Details = ({ getAdmin, admin }) => {
    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentAdminId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        getAdmin(currentAdminId)
    }, [getAdmin]);

    return (
        <Wrapper>

            {
                admin !== undefined ? 
                <StyledDetails>
                    <P>First Name: {admin.firstname}</P>
                    <P>Last Name: {admin.lastname}</P>
                    <P>Email: {admin.email}</P>
                    <P>Role: {admin.role}</P>
                    <P>IsActive: {admin.isActive === false ? 'false' : 'true'}</P>
                    <PanelAdminActions 
                        id={admin.id} 
                        status={admin.isActive}
                        isConfirmed={admin.isConfirmed}
                    />
                </StyledDetails> : <Loading/>
            }
        </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdmin: (id) => dispatch(getAdmin(id))
    }
}

export default connect(mapStateToProps,mapDispatchToState)(Details);