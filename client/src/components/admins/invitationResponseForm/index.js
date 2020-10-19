import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRecievedToken } from '../../../store/actions/authActions';

const InvitaionResponseForm = ({ getRecievedToken }) => {
    const history = useHistory();
    const historyPathname = history.location.pathname;
    const parts = historyPathname.split('/');
    const token = parts[parts.length - 1]
    
    useEffect(() => {
        getRecievedToken(token)
    },[getRecievedToken])
    return (
        <div>
            InvitaionResponseForm
        </div>
    )
}

const mapDispatchToState = dispatch => {
    return {
        getRecievedToken: (token) => dispatch(getRecievedToken(token))
    }
}

export default connect(null, mapDispatchToState)(InvitaionResponseForm);