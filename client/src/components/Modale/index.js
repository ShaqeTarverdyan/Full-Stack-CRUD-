import React from 'react';
import styled from 'styled-components';
import { closeModal } from '../../store/actions/appActions';
import { FormWrapper } from '../../generalStyles';
import { useSelector, useDispatch } from 'react-redux';

const Containerstyle = {
    "position": "absolute",
    "top": "20%",
    "width": "95%",
    "zIndex": "9",
    "boxShadow": "1px 2px 10px 0px rgba(0,0,0,0.69)",
    "left": '25%',
    "padding": '4rem',
};
const Icon = styled.button`
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 2rem;
    font-weight: bolder;
    cursor: pointer;
    color: var(--color-mainDark:)
`;

const Modale = ({children}) => {
    const isShownModal = useSelector(state => state.app.isShownModal);

    const dispatch = useDispatch();
    return (
        isShownModal && 
        <FormWrapper style={Containerstyle}>
            <Icon onClick={() => dispatch(closeModal())}>X</Icon>
            {children}
        </FormWrapper>
    )
}


export default Modale;