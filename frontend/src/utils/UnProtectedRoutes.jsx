import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'

const UnProtectedRoutes = () => {
    const user = localStorage.getItem("fullName")
    return (
        <>
            {!user? <Outlet /> : <Navigate to="/task-list" />}
        </>
    )
}

export default UnProtectedRoutes