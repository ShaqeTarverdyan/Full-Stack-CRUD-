import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmins } from '../../../store/actions/authActions';
import PanelAdminActions from '../panelAdminActions';

const AcceptAdmins = ({ admins, getAdmins }) => {
    useEffect(() => {
        getAdmins();
    }, [getAdmins]);

    return (
        <div>
            <ul>
                {
                    admins
                        .filter(admin => admin.role === 'panel')
                        .map(({id, firstname, lastname, email, role, isActive, isConfirmed}) => (
                        <li>
                            <p>First Name: {firstname}</p>
                            <p>last name: {lastname}</p>
                            <p>email: {email}</p>
                            <p>role: {role}</p>
                            <p>isActive: {isActive === false ? 'false' : 'true'}</p>
                            <PanelAdminActions id={id} status={isActive} isConfirmed={isConfirmed}/>

                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        admins: state.auth.admins
    }
}

const mapDispatchToState = dispatch => {
    return {
        getAdmins: () => dispatch(getAdmins())
    }
}
export default connect(mapStateToProps, mapDispatchToState)(AcceptAdmins);