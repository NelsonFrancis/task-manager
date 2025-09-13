import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">Task Manager</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-link"><Link to="/">Register</Link></li>
                <li className="nav-link"><Link to="/login">Login</Link></li>
                <li className="nav-link"><Link to="/task-list">Task List</Link></li>
                <li className="nav-link"><Link to="/add-task">Add Task</Link></li>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar