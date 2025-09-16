import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  axios.defaults.withCredentials = true; // set globally
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [markCompleteId, setMarkCompleteId] = useState("");
  const [markCompleteTask, setMarkCompleteTask] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState("");
  const [deleteConfirmTask, setDeleteConfirmTask] = useState("");

  const getMyTasks = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/tasks/getMyTasks`, {withCredentials: true,})
      .then(res => {
        setTask(res.data.data)
        setLoading(false);
      })  
      .catch(err => {
        setLoading(false);
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

  const goToDetail = (myTaskId) => {
    navigate(`/edit-task/${myTaskId}`); // 👈 pass id in URL
  };

  const markTaskComplete = (id, task) => {
    setMarkCompleteId(id)
    setMarkCompleteTask(task)
  }

  const taskCompleted = async() => {
    setLoading(true);
    await axios.patch(`${import.meta.env.VITE_BASE_URL}/tasks/updateStatus`, {taskId: markCompleteId}, {withCredentials: true,})
      .then(res => {
        setLoading(false);
        toast.success('Marked task as complete !!!', {
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
        setTimeout(function(){window.location.reload()}, 2000)
      })  
      .catch(err => {
        setLoading(false);
        toast.error('Something went wrong while marking tasks complete !!!', {
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

  const deleteData = (id, task) => {
    setDeleteConfirmId(id)
    setDeleteConfirmTask(task)
  }

  const deleteTask = async() => {
    setLoading(true);
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/tasks/deleteTask`,{
      withCredentials: true,
      data: {taskId: deleteConfirmId}
    })
      .then(res => {
        setLoading(false);
        toast.success('Task deleted successfully !!!', {
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
        setTimeout(function(){window.location.reload()}, 2000)
        
      })  
      .catch(err => {
        setLoading(false);
        toast.error('Something went wrong while deleting this tasks !!!', {
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
              {task.length == 0 ? <tr><th colSpan={6}><p className='no_task'>No tasks found</p></th></tr> : 
                task && task.map((t, index) => (
                  <tr key={t._id}>
                    <th>{index + 1}</th>
                    <th>{t.task}</th>
                    <th>{t.status}</th>
                    <th>{t.createdAt.split("T")[0]} <br />{t.createdAt.split("T")[1].split(".")[0]}</th>
                    <th>{t.status == "Completed" ? <>{t.completedAt.split("T")[0]} <br />{t.completedAt.split("T")[1].split(".")[0]} </>: "-"}</th>
                    <th>
                      {
                        t.status == "Completed" 
                        ? 
                          <>
                            <button className='btn edit_btn' onClick={() => goToDetail(t._id)}>Edit</button>
                            <button className='btn delete_btn' data-toggle="modal" data-target="#deleteTaskModal" onClick={e => deleteData(t._id, t.task)}>Delete</button>
                          </> 
                        :
                          <>
                            <button className='btn complete_btn' data-toggle="modal" data-target="#markCompleteModal" onClick={e => markTaskComplete(t._id, t.task)}>Mark Complete</button>
                            <button className='btn edit_btn' onClick={() => goToDetail(t._id)}>Edit</button>
                            <button className='btn delete_btn' data-toggle="modal" data-target="#deleteTaskModal" onClick={e => deleteData(t._id, t.task)}>Delete</button>
                          </>
                      }
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <ToastContainer />

        <div className="modal fade" id="markCompleteModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="myModalLabel">
                  Mark this task as complete?
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                { 
                  loading ? 
                  <p>Loading...</p> : 
                  <>
                    <p className='modal_hd'>Are you sure you want to mark this task as Complete?</p>
                    <p><span className='modal_label'>Task id</span> {markCompleteId}</p>
                    <p><span className='modal_label'>Task</span> {markCompleteTask}</p>
                 </>
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn theme_btn" onClick={taskCompleted}>Complete</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="deleteTaskModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="myModalLabel">
                  Delete this task?
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                { 
                  loading ? 
                  <p>Loading...</p> : 
                  <>
                    <p className='modal_hd'>Are you sure you want to delete this task?</p>
                    <p><span className='modal_label'>Task id</span> {deleteConfirmId}</p>
                    <p><span className='modal_label'>Task</span> {deleteConfirmTask}</p>
                 </>
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn theme_btn" onClick={deleteTask}>Delete</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TaskList