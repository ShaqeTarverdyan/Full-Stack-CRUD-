import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmins, togglePanelAdminStatus } from '../../../store/actions/authActions';

const AcceptAdmins = ({ admins, getAdmins, togglePanelAdminStatus }) => {
    const nonActiveAdmins = admins.filter(admin => admin.role === 'panel');
    useEffect(() => {
        getAdmins()
    }, [getAdmins, nonActiveAdmins]);
    return (
        <div>
            <ul>
                {
                    nonActiveAdmins.length > 0 ?
                    nonActiveAdmins.map(({id, firstname, lastname, email, role, isActive}) => (
                        <li>
                            <p>First Name: {firstname}</p>
                            <p>last name: {lastname}</p>
                            <p>email: {email}</p>
                            <p>role: {role}</p>
                            <p>isActive: {isActive === false ? 'false' : 'true'}</p>
                            <button onClick={() => togglePanelAdminStatus(id, true)}>Activate</button>
                            <button onClick={() => togglePanelAdminStatus(id, false)}>block</button>
                        </li>
                    )): <div>empty </div>
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
        getAdmins: () => dispatch(getAdmins()),
        togglePanelAdminStatus: (id, status) => dispatch(togglePanelAdminStatus(id, status))
    }
}
export default connect(mapStateToProps, mapDispatchToState)(AcceptAdmins);