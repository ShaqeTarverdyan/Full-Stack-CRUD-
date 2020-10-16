import React from 'react';
import { connect } from 'react-redux';
//import AuthForm from '../authentication/AuthForm';



const EditAdmin = ({ admins }) => {
    console.log('admin', admins)
    return(
        // <AuthForm 
        //     submitFunction={updateAccounDetails}
        //     defaultValues={{
        //         firstname: admin.firstname || '',
        //         lastname: admin.lastname || '',
        //         email: admin.email || '',
        //         role: admin.role || ''
        //     }}
        //     butonTitle="update"
        // />
        <div>shaqe</div>
    )
}

const mapStateToProps = state => {
    return {
        admins: state.auth.admins
    }
}


export default connect(mapStateToProps)(EditAdmin);