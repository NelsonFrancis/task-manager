import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import Navbar from './components/Navbar';
import EditTask from './pages/EditTask';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState("");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task-list" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} /> 
      </Routes>
    </>
  )
}

export default App
