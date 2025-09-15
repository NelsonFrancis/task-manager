import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async(e) => {
    e.preventDefault();
    if(fullName === "" || email === "" || password === ""){
      toast.warn('All fields are mandatory!!!', {
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
      return
    }
    setLoading(true);
    await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, {
      fullName,
      email,
      password
    })
    .then(res => {
      setLoading(false);
      toast.success('User Registered !!!', {
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
      navigate("/login");
    })
    .catch(err => {
      setLoading(false);
      toast.error('Something went wrong !!!', {
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
    <div className="container">
      <div className="white_bg">
        <h1>Register</h1>
        { loading ? 
          <p>Loading...</p> : 
          <form onSubmit={registerUser}>
            <input type='text' className='form-control' placeholder='Enter Full Name' onChange={e => setFullName(e.target.value)} />
            <input type='text' className='form-control' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
            <input type='password' className='form-control' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            <button className='btn reg_btn'>Submit</button>
          </form>
        }
        <ToastContainer
        />
      </div>
    </div>
  )
}

export default Register