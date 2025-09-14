import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutUser = async() => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {withCredentials: true,})
      .then(res => {
        console.log("response = ", res);
        localStorage.setItem("fullName", "")
        navigate("/login")
      })  
      .catch(err => {
        console.log("error = ",err);
        toast.error('Something went wrong while logging out !!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
        });
      })
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand" href="#">Task Manager</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              {
                localStorage.getItem("fullName") == "" ? 
                <>
                  <li className="nav-link">
                    <NavLink to="/" className={({isActive})=>isActive?"active-link":""}>Register</NavLink>
                  </li>
                  <li className="nav-link">
                    <NavLink to="/login" className={({isActive})=>isActive?"active-link":""}>Login</NavLink>
                  </li>
                </>: 
                <>
                  <li className="nav-link">
                    <NavLink to="/task-list" className={({isActive})=>isActive?"active-link":""}>Task List</NavLink>
                  </li>
                  <li className="nav-link">
                    <NavLink to="/add-task" className={({isActive})=>isActive?"active-link":""}>Add Task</NavLink>
                  </li>
                </>
              }
            </ul>
            { 
              localStorage.getItem("fullName") != "" && 
              <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                      Welcome {localStorage.getItem("fullName")}
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" onClick={logoutUser} href="#">Logout</a>
                    </div>
                  </li>
              </ul>
            }
        </div>
      </div>
      <ToastContainer />
    </nav>
    </>
  )
}

export default Navbar