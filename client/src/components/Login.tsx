import React from "react";
import { useState, useEffect } from "react";
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

  //Hooks Register
  const [pseudo, setPseudo] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  console.log(password1);
  console.log(password2);

  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [logged]);

  //LOGIN
  const login = async (): Promise<LoginProps> => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      };
      console.log(requestOptions);

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
  //REGISTER
  const SendRegister = async (): Promise<LoginProps> => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudo, password: password1 }),
      };
      console.log(requestOptions);
      const response = await fetch(
        "http://localhost:9000/api/register",
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
          style={{ marginBottom: "3%" }}
          placeholder="Zangdar"
          radius="xl"
          onChange={(event) => setPseudo(event.currentTarget.value)}
        ></TextInput>
        <PasswordInput
          placeholder="Mot de passe"
          label="Mot de passe"
          radius="xl"
          style={{ marginBottom: "3%" }}
          withAsterisk
          onChange={(event) => setPassword1(event.currentTarget.value)}
        />
        <PasswordInput
          placeholder="Confirmation du mot de passe"
          label="Confirmation du mot de passe"
          radius="xl"
          withAsterisk
          onChange={(event) => setPassword2(event.currentTarget.value)}
        />
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          style={{ marginBottom: "1%", marginTop: "5%", left: "40%" }}
          onClick={() => {
            if (password1 === password2) {
              console.log("passwords are the same");
              SendRegister().then(async (res) => {
                if (res.logged) {
                  setLogged(res.logged);
                  navigate("/home");
                } else {
                  alert("wrong password");
                  navigate("/login");
                }
              });
            } else {
              alert("passwords are not the same");
            }
          }}
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
              login().then(async (res) => {
                if (res.logged) {
                  setLogged(res.logged);
                  navigate("/home");
                } else {
                  alert("wrong password");
                  navigate("/login");
                }
              });
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
