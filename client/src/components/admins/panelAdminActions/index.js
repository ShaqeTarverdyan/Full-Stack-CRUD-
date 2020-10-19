import React from 'react';
import { connect } from 'react-redux';
import { togglePanelAdminStatus, toggleConfirmation } from '../../../store/actions/authActions';


const PanelAdminActions = ({id, togglePanelAdminStatus, toggleConfirmation, status, isConfirmed}) => {
    
    return (
        <>
           {
                isConfirmed === true &&
                <button onClick={() => togglePanelAdminStatus(id, !status)}>
                    {status === true ? 'Block' : 'Activate'}
                </button>
           } 
            <button onClick={() => toggleConfirmation(id, !isConfirmed)}>
                {isConfirmed === true ? 'DeConfirm': 'Confirm'}
            </button>
        </>
    )
};


const mapDispatchToState = dispatch => {
    return {
        togglePanelAdminStatus: (id, status) => dispatch(togglePanelAdminStatus(id, status)),
        toggleConfirmation: (id, value) => dispatch(toggleConfirmation(id, value))
    }
}

export default connect(null,mapDispatchToState)(PanelAdminActions);