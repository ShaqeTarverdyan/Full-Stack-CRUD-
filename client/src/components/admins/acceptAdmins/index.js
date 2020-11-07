import React, { useEffect } from 'react';
import { getAdmins } from '../../../store/actions/authActions';
import PanelAdminActions from '../panelAdminActions';
import { useSelector, useDispatch } from 'react-redux';

const AcceptAdmins = () => {
    const admins = useSelector(state => state.auth.admins);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdmins());
    }, [getAdmins, JSON.stringify(admins)]);

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

export default AcceptAdmins;