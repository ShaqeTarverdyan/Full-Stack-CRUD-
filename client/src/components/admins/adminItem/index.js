import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAdmin } from '../../../store/actions/authActions';
import styled from 'styled-components';
import Button from '../../UI/Button';
import PanelAdminActions from '../panelAdminActions';

const StyledItem = styled.div`
    font-size: 2rem;
    border-bottom: 1px solid;
    color: var(--color-text);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Actions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-column-gap: 10px;
`;

const ButtonStyle = {
    "width": "80px",
    "margin": "0",
    "borderRadius": "1rem"
}
const AdminItem = ({ item, signedAdminRole, deleteAdmin }) => {
    const { id, email, role } = item;
    console.log('signedAdminRole', signedAdminRole)
    return (
        <StyledItem>
            <div>
                <p>Email: {email}</p>
                <p>Role: {role}</p>
            </div>

            {
                signedAdminRole === 'super' &&
                <Actions>
                    <Link to={{
                        pathname: `/admin-details/${id}`,
                        aboutProps: {
                            id: id
                        }                 
                    }}>
                        <Button style={ButtonStyle}>Details</Button>
                    </Link>
                    <Button style={ButtonStyle} onClick={() => deleteAdmin(id)}>Delete</Button>
                </Actions>
            }
        </StyledItem>
    )
}

const mapDispatchToState = dispatch => {
    return {
        deleteAdmin: (admin_id) => dispatch(deleteAdmin(admin_id))
    }
}

export default connect(null, mapDispatchToState)(AdminItem);