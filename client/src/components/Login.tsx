import React from "react";
import { useSessionStorage } from "@mantine/hooks";
import { Center,Button,TextInput,Card } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import '../App.css';
interface LoginProps {
  logged: boolean;
}
function Login() {
  const navigate = useNavigate();
  const [logged, setLogged] = useSessionStorage({
    key: "logged",
    defaultValue: false,
  });

  const login = async (): Promise<LoginProps> => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
    const response = await fetch('http://localhost:9000/api/login', requestOptions);
    const data =  response.json();
    return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  return (
    <Center style={{height:"90vh"}}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{display:"flex",flexDirection:"column",backgroundColor:"#f42b03",backgroundImage:"linear-gradient(316deg, #f42b03 0%, #ffbe0b 74%);"}}>
        <TextInput label="Username" placeholder="Enter your username" />
        <TextInput label="Password" placeholder="Enter your password" />
        <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Login</Button>
      </Card>

    </Center>
  );
}

export default Login;
