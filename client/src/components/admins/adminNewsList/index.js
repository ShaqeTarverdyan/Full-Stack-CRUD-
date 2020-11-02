import React, { useEffect } from 'react';
import NewsList from '../../news/newsList';
import { connect } from 'react-redux';
import { getMyNewslist } from '../../../store/actions/newsActions'

const AdminNewsList = ({ getMyNewslist, admin }) => {

    useEffect(() => {
        getMyNewslist(localStorage.getItem('admin_id'))
    }, [getMyNewslist]);

    return (
        <>
            <h1 style={{textAlign: 'center',margin: "5%"}}>My News</h1>
            {
                Object.keys(admin).length !== 0 && 
                <NewsList 
                    newsList={admin.news}
                    showTypes={false}
                    showPagination={false}
                    showReportFunctionality={true}

                />
            }
        </>
    )
}
const mapStateToProps = state => {
    return {
        totalPages: state.news.totalPages,
        admin: state.auth.admin
    }
}

const mapDispatchToState = dispatch => {
    return {
        getMyNewslist: (id) => dispatch(getMyNewslist(id))
    }
}


export default connect(mapStateToProps,mapDispatchToState)(AdminNewsList);