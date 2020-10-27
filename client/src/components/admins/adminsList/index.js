import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmins } from '../../../store/actions/authActions';
import styled from 'styled-components';
import AdminItem from '../adminItem';
import Loading from '../../loader'

const StyledAdminsList = styled.div`
    display: grid;
    grid-row-gap: 1rem;
    width: 80%;
    margin: 10% auto;
`
const Wrapper = styled.div``


const AdminsList = ({ getAdmins, admins, admin_id }) => {
    useEffect(() => {
        getAdmins();
    },[getAdmins]);

    const signedAdmins = admins.find(admin => admin.id == admin_id);
    const adminsList = admins ? admins.filter(admin => admin.id != admin_id): [];

    return (
    <Wrapper>
        <button onClick={getAdmins}>All Admins</button>
        <div>
            <label>Filter By</label>
            <select >
                <option value="super">Super</option>
                <option value="panel">Panel</option>
            </select>
        </div>
        <StyledAdminsList>
        {
            adminsList.length > 0 ? adminsList.map(admin => (
                <AdminItem 
                    key={admin.id} 
                    item={admin}
                    signedAdminRole={signedAdmins !== undefined && signedAdmins.role}
                />
            )) : <div>empty</div>
        }
        </StyledAdminsList>
    </Wrapper>
    )
}

const mapStateToProps = state => {
    return {
        admins: state.auth.admins,
        admin_id: state.auth.admin_id
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdmins: (admin_id) => dispatch(getAdmins(admin_id))
    }
}
export default connect(mapStateToProps, mapDispatchToState)(AdminsList);