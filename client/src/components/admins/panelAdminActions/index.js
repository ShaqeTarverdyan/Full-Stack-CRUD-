import React from 'react';
import { togglePanelAdminStatus, toggleConfirmation } from '../../../store/actions/authActions';
import Button from '../../UI/Button';
import { Buttonstyle } from '../../news/newsItem';
import { useDispatch } from 'react-redux';


const PanelAdminActions = ({id, status, isConfirmed}) => {
    const dispatch = useDispatch();
    return (
        <>
           {
                isConfirmed === true &&
                <Button style={Buttonstyle}onClick={() => dispatch(togglePanelAdminStatus(id, !status))}>
                    {status === true ? 'Block' : 'Activate'}
                </Button>
           } 
            <Button style={Buttonstyle}onClick={() => dispatch(toggleConfirmation(id, !isConfirmed))}>
                {isConfirmed === true ? 'DeConfirm': 'Confirm'}
            </Button>
        </>
    )
};

export default PanelAdminActions;