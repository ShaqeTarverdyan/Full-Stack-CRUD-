import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmins } from '../../../store/actions/authActions';
import PanelAdminActions from '../panelAdminActions';

const AcceptAdmins = ({ admins, getAdmins }) => {
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
                            <PanelAdminActions id={id}/>

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
        getAdmins: () => dispatch(getAdmins())
    }
}
export default connect(mapStateToProps, mapDispatchToState)(AcceptAdmins);