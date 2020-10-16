import React from 'react';
import { connect } from 'react-redux';
import { useHistory }  from 'react-router-dom';


const Dashboard = ({admin_id}) => {
    let history = useHistory();


    if(!admin_id) {
        history.push("/login")
    }
    return(
        <div>
            <h1>Welcome Dashboard:)</h1>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        admin_id: state.auth.admin_id
    }
}
export default connect(mapStateToProps)(Dashboard);