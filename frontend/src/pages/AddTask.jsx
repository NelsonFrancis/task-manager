import React, {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addTask = async(e) => {
    e.preventDefault();
    if(task === ""){
      toast.warn('Task field is mandatory!!!', {
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
    await axios.post(`${import.meta.env.VITE_BASE_URL}/tasks/addTask`, {
      task,
      status: "Active",
      completedAt: 0
    }, {withCredentials: true,})
    .then(res => {
      setLoading(false);
      toast.success('Task added !!!', {
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
      navigate("/task-list");
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
        <h1>Add Task</h1>
        { loading ? 
          <p>Loading...</p> : 
          <form onSubmit={addTask}>
            <input type='text' className='form-control' placeholder='Enter Task' onChange={e => setTask(e.target.value)} />
            <button className='btn reg_btn'>Submit</button>
          </form>
        }
        <ToastContainer />
      </div>
    </div>
  )
}

export default AddTask