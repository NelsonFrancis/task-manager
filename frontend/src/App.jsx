import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import Navbar from './components/Navbar';
import EditTask from './pages/EditTask';
import ProtectedRoutes from './utils/ProtectedRoutes';
import UnProtectedRoutes from './utils/UnProtectedRoutes';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<UnProtectedRoutes />}>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} /> 
        </Route>
      </Routes>
    </>
  )
}

export default App
