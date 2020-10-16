import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAdmins } from '../../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const Details = ({ admins, getAdmins }) => {
    useEffect(() => {
        getAdmins()
    }, [getAdmins])

    let history = useHistory();
    const historyPathname = history.location.pathname;
    const splitedPathname = historyPathname.split(/([0-9]+)/);
    const currentAdminId = JSON.parse(splitedPathname[1]);
    const currentAdmin = admins.length > 0 ? admins.filter(admin => admin.id === currentAdminId) : '';
    return (
        <div>

            {
                currentAdmin[0] !== undefined ? 
                <div>
                    <p>name: {currentAdmin[0].firstname}</p>
                    <p>last name: {currentAdmin[0].latname}</p>
                    <p>email: {currentAdmin[0].email}</p>
                    <p>role: {currentAdmin[0].role}</p>
                    <p>isActive: {currentAdmin[0].isActive === false ? 'false' : 'true'}</p>
                </div> : <div>Loading...</div>
            }
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

export default connect(mapStateToProps,mapDispatchToState)(Details);