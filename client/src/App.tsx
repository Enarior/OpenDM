import React,{useState} from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter as Router,  Navigate,  Route,  Routes,} from "react-router-dom";
import { useSessionStorage } from '@mantine/hooks';
function App() {

  const [logged, setLogged] = useSessionStorage({ key: 'logged', defaultValue: false });
  console.log(logged);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
