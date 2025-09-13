import React, {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async(e) => {
    e.preventDefault();
    if(email === "" || password === ""){
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
    await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
      email,
      password
    }, {withCredentials: true,})
    .then(res => {
      setLoading(false);
      console.log("response = ", res);
      navigate("/task-list");
    })
    .catch(err => {
      setLoading(false);
      console.log("error = ",err);
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
        <h1>Login User</h1>
        { loading ? 
          <p>Loading...</p> : 
          <form onSubmit={loginUser}>
            <input type='text' className='form-control' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
            <input type='password' className='form-control' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            <button className='btn reg_btn'>Submit</button>
          </form>
        }
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login