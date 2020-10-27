import React from 'react';
import { connect } from 'react-redux';
import { togglePanelAdminStatus, toggleConfirmation } from '../../../store/actions/authActions';
import Button from '../../UI/Button';
import { Buttonstyle } from '../../news/newsItem'


const PanelAdminActions = ({id, togglePanelAdminStatus, toggleConfirmation, status, isConfirmed}) => {
    
    return (
        <>
           {
                isConfirmed === true &&
                <Button style={Buttonstyle}onClick={() => togglePanelAdminStatus(id, !status)}>
                    {status === true ? 'Block' : 'Activate'}
                </Button>
           } 
            <Button style={Buttonstyle}onClick={() => toggleConfirmation(id, !isConfirmed)}>
                {isConfirmed === true ? 'DeConfirm': 'Confirm'}
            </Button>
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