import React,{useState} from 'react';
import { useSessionStorage } from '@mantine/hooks';
import {BrowserRouter as Router,  Navigate,  Route,  Routes,} from "react-router-dom";

function Toto() {

  const [logged, setLogged] = useSessionStorage({ key: 'logged', defaultValue: false });
  if(logged){
    return (
      <Navigate to="/home" />
    );
  }

  return (
    <Navigate to="/login" />
  );
}

export default Toto;
