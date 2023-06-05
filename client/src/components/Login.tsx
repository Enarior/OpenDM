import React from "react";
import { useState, useEffect} from "react";
import { useSessionStorage, useDisclosure } from "@mantine/hooks";
import {
  Center,
  Button,
  TextInput,
  Card,
  Modal,
  Group,
  Text,
  PasswordInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../App.css";
interface LoginProps {
  logged: boolean;
}
function Login() {
  //HOOKS
  const [logged, setLogged] = useSessionStorage({
    key: "logged",
    defaultValue: false,
  });
  //HOOKS LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if(logged){
      navigate("/home");
    }else{
      navigate("/login");
    }
  }, [logged]);
  const login = async (): Promise<LoginProps> => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TestUsername: username, TestPassword: password }),
      };
      const response = await fetch(
        "http://localhost:9000/api/login",
        requestOptions
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const [opened, { open, close }] = useDisclosure(false);
  
  
  
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Inscription à la taverne"
        centered
        size="md"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          label="Pseudo d'aventurier (Un qui en jette!)"
          style={{marginBottom:"3%"}}
          placeholder="Zangdar"
          radius="xl"
        ></TextInput>
        <PasswordInput
          placeholder="Mot de passe"
          label="Mot de passe"
          radius="xl"
          style={{marginBottom:"3%"}}
          withAsterisk
        />
        <PasswordInput
          placeholder="Confirmation du mot de passe"
          label="Confirmation du mot de passe"
          radius="xl"
          withAsterisk
        />
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          style={{ marginBottom: "1%", marginTop: "5%",left:"40%" }}
          onClick={close}
        >
          S'inscrire
        </Button>
      </Modal>
      <Center
        style={{
          height: "86vh",
          backgroundImage:
            "url(" + require("../ressources/images/entrer_taverne.jpg") + ")",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{
            display: "flex",
            flexDirection: "column",
            width: "25%",
            height: "53%",
          }}
        >
          <TextInput
            style={{ padding: "3%" }}
            label="Username"
            placeholder="Enter your username"
            radius="xl"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />

          <PasswordInput
            style={{ padding: "3%", marginBottom: "2%" }}
            placeholder="Password"
            label="Password"
            radius="xl"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            style={{ marginBottom: "6%" }}
            onClick={() => {
              const data = login();
              if (true){
                setLogged(true);
                navigate("/home");
              } 
              else{
                alert("wrong password");
                navigate("/login");
              } ;
            }}
          >
            Login
          </Button>
          <Group
            position="center"
            style={{
              paddingTop: "1%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text>Pas encore enregistré ?</Text>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              style={{ marginBottom: "1%" }}
              onClick={open}
            >
              S'inscrire
            </Button>
          </Group>
        </Card>
      </Center>
    </>
  );
}

export default Login;
