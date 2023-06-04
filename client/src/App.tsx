import React,{useState} from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Toto from './components/Toto';
import {BrowserRouter as Router,  Navigate,  Route,  Routes,} from "react-router-dom";
import { useSessionStorage } from '@mantine/hooks';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Toto/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
