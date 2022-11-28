import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import Loading from '../../Pages/Shared/Loading/Loading';

const PrivateRoute = ({children}) => {

    const {loading,user} = useContext(AuthContext)
const location = useLocation()
    if(loading){
        return <Loading></Loading>
    }

    if(user?.uid){
        return children
    }


    return <Navigate to='/login' replace state={{from:location}} ></Navigate>
};

export default PrivateRoute;