import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify';

const TaskList = () => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);

  const getMyTasks = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/tasks/getMyTasks`, {withCredentials: true,})
      .then(res => {
        setTask(res.data.data)
        setLoading(false);
        console.log("response = ", res.data);
      })  
      .catch(err => {
        setLoading(false);
        console.log("error = ",err);
        toast.error('Something went wrong while fetching tasks !!!', {
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
    getMyTasks()
  },[])

  return (
    <div className="container">
      <div className="white_bg">
        <h1>Task List</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task</th>
                <th scope="col">Status</th>
                <th scope="col">Created at</th>
                <th scope="col">Completed at</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                task && task.map((t, index) => (
                  <tr key={t._id}>
                    <th>{index + 1}</th>
                    <th>{t.task}</th>
                    <th>{t.status}</th>
                    <th>{t.createdAt.split("T")[0]} <br />{t.createdAt.split("T")[1].split(".")[0]}</th>
                    <th>{t.status == "Completed" ? <>{t.completedAt.split("T")[0]} <br />{t.completedAt.split("T")[1].split(".")[0]} </>: ""}</th>
                    <th>{t.status == "Completed" ? "" :<button className='btn reg_btn'>Mark Complete</button>}</th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default TaskList