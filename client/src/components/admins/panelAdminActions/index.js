import React from 'react';
import { connect } from 'react-redux';
import { togglePanelAdminStatus } from '../../../store/actions/authActions';


const PanelAdminActions = ({id, togglePanelAdminStatus}) => {
    return (
        <>
            <button onClick={() => togglePanelAdminStatus(id, true)}>Activate</button>
            <button onClick={() => togglePanelAdminStatus(id, false)}>block</button>
        </>
    )
};

const mapDispatchToState = dispatch => {
    return {
        togglePanelAdminStatus: (id, status) => dispatch(togglePanelAdminStatus(id, status))
    }
}

export default connect(null, mapDispatchToState)(PanelAdminActions);