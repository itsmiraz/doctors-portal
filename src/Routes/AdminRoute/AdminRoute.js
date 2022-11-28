import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';

const AdminRoute = ({children}) => {

    const {loading,user} = useContext(AuthContext)

    const [isAdmin,isAdminLoading] = useAdmin(user.email)

    const location = useLocation()

    if(loading || isAdminLoading){
        return <Loading></Loading>
    }

    if(user && isAdmin ){
        return children
    }


    return <Navigate to='/login' replace state={{from:location}} ></Navigate>
};

export default AdminRoute;