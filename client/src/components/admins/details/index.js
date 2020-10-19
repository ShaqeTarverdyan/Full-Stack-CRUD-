import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmin } from '../../../store/actions/authActions';
import { useHistory } from 'react-router-dom';
import PanelAdminActions from '../panelAdminActions';

const Details = ({ getAdmin, admin }) => {


    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentAdminId = JSON.parse(splitedPathname[1]);

    useEffect(() => {
        getAdmin(currentAdminId)
    }, [getAdmin]);

    return (
        <div>

            {
                admin !== undefined ? 
                <div>
                    <p>name: {admin.firstname}</p>
                    <p>last name: {admin.latname}</p>
                    <p>email: {admin.email}</p>
                    <p>role: {admin.role}</p>
                    <p>isActive: {admin.isActive === false ? 'false' : 'true'}</p>
                    <PanelAdminActions 
                        id={admin.id} 
                        status={admin.isActive}
                        isConfirmed={admin.isConfirmed}
                    />
                </div> : <div>Loading...</div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admin: state.auth.admin
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdmin: (id) => dispatch(getAdmin(id))
    }
}

export default connect(mapStateToProps,mapDispatchToState)(Details);