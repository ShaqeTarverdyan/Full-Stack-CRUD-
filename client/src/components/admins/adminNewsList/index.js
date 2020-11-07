import React, { useEffect } from 'react';
import NewsList from '../../news/newsList';
import { getMyNewslist } from '../../../store/actions/newsActions';
import { useSelector, useDispatch } from 'react-redux';

const AdminNewsList = () => {
    const admin = useSelector(state => state.auth.admin);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyNewslist(localStorage.getItem('admin_id')))
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


export default AdminNewsList;