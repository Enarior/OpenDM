import React,{useState} from 'react';
import { useSessionStorage } from '@mantine/hooks';
import './App.css';

function Home() {

  const [logged, setLogged] = useSessionStorage({ key: 'logged', defaultValue: false });
  console.log(logged);
  return (
    <Router>
      <Routes>
        <Route path="/" element={logged ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default Home;
