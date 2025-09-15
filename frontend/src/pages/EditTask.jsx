import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
    const [task, setTask] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const editMyTask = async(e) => {
      e.preventDefault();
      if(task == ""){
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
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/tasks/editTask`,
        { taskId: id, task },  
        { withCredentials: true } 
      )
      .then(res => {
        setLoading(false);
        toast.success('Task edited successfully !!!', {
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
        setTimeout(function(){navigate("/task-list")}, 2000)
      })  
      .catch(err => {
        setLoading(false);
        toast.error('Something went wrong while editing this task !!!', {
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

    const getTaskDetails = async() => {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/tasks/getMyTasks/${id}`, {withCredentials: true,})
      .then(res => {
        setTask(res.data.data.task)
        setLoading(false);
      })  
      .catch(err => {
        setLoading(false);
        toast.error('Something went wrong while fetching task !!!', {
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

    useEffect(() => {
        getTaskDetails()
    },[])

  return (
    <div className="container">
      <div className="white_bg">
        <h1>Edit Task</h1>
        { loading ? 
          <p>Loading...</p> : 
          <form onSubmit={editMyTask}>
            <input type='text' className='form-control' placeholder='Enter Task' value={task} onChange={e => setTask(e.target.value)} />
            <button className='btn reg_btn'>Submit</button>
          </form>
        }
        <ToastContainer />
      </div>
    </div>
  )
}

export default EditTask