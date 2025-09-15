import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const ProtectedRoutes = () => {
    const user = localStorage.getItem("fullName")
    return (
        <>
            {user? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}

export default ProtectedRoutes