import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
        {/* Example of a route with a parameter */}
        {/* <Route path="/users/:id" element={<UserProfile />} />  */}
      </Routes>
    </>
  )
}

export default App
