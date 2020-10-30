import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { closeModal } from '../../store/actions/appActions';
import { FormWrapper } from '../../generalStyles'

const Containerstyle = {
    "position": "absolute",
    "top": "20%",
    "width": "95%",
    "z-index": "9",
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

const Modale = ({children, isShownModal, closeModal}) => {
    return (
        isShownModal && 
        <FormWrapper style={Containerstyle}>
            <Icon onClick={closeModal}>X</Icon>
            {children}
        </FormWrapper>
    )
}

const mapStateToProps = state => {
    return {
        isShownModal: state.app.isShownModal
    }
}

const mapDispatchToState = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}
export default connect(mapStateToProps, mapDispatchToState)(Modale);