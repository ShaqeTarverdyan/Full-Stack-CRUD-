import React, { useEffect, useState } from "react";
import { getAdmins } from "../../../store/actions/authActions";
import styled from "styled-components";
import AdminItem from "../adminItem";
import Loading from "../../loader";
import { StyledSelect, StyledOption } from '../../../generalStyles';
import EmptyPage from '../../emptyPage';
import { useSelector, useDispatch } from 'react-redux';

const StyledAdminsList = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  width: 80%;
  margin: 10% auto;
`;

const SelectWrapper = styled.div`
    width: 60%;
    margin: 5% auto;
    display: grid;
    grid-template-columns: 10% 90%;
    align-items: center;
    grid-column-gap: 1rem;
    font-size: 1.8rem;
`;

const Label = styled.label`
    font-size: 1.5rem;
    color: var(--color-main)
`;
const Wrapper = styled.div``;

const AdminsList = ( ) => {

  const admins = useSelector(state =>  state.auth.admins);
  const admin_id = useSelector(state =>  state.auth.admin_id);
  const loading = useSelector(state =>  state.auth.loading);

  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAdmins());
  }, [getAdmins]);

  const signedAdmins = admins.find((admin) => admin.id == admin_id);
  const adminsList = admins
    ? admins.filter((admin) => admin.id !== admin_id)
    : [];

  const getAdminRole = (event) => {
     setSelectedValue(event.target.value )
     dispatch(getAdmins(event.target.value))
  };

  if(loading) {
      return <Loading/>
  }
  return (
    <Wrapper>
      <SelectWrapper>
        <Label>Filter By</Label>
        <StyledSelect onChange={getAdminRole} value={selectedValue}>
          <StyledOption value="">All Admins</StyledOption>
          <StyledOption value="super">Super</StyledOption>
          <StyledOption value="panel">Panel</StyledOption>
        </StyledSelect>
      </SelectWrapper>
      <StyledAdminsList>
        {adminsList.length > 0 ? (
          adminsList.map((admin) => (
            <AdminItem
              key={admin.id}
              item={admin}
              signedAdminRole={signedAdmins !== undefined && signedAdmins.role}
            />
          ))
        ) : (
          <EmptyPage/>
        )}
      </StyledAdminsList>
    </Wrapper>
  );
};



export default AdminsList;
