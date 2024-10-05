import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function UserProtect() {

    const {loggedUser} = useSelector((state)=>state.user);

    return (loggedUser) ? <Outlet/> : <Navigate to='/login' />;

}

export default UserProtect