import React from "react";
import { useSessionStorage, useDisclosure } from "@mantine/hooks";
import { Center, Button, TextInput, Card, Modal, Group,Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../App.css";
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "React POST Request Example" }),
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

  //Mise en place du modal permettant d'enregistrer un nouveau compte
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered size="md">
        {/* Modal content */}
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
          }}>
          <TextInput
            style={{ padding: "3%" }}
            label="Username"
            placeholder="Enter your username"
          />
          <TextInput
            style={{ padding: "3%",marginBottom:"2%" }}
            label="Password"
            placeholder="Enter your password"
          />
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            style={{ marginBottom: "6%"}}>
            Login
          </Button>
           <Group position="center" style={{
            paddingTop:"1%",
            display: "flex",
            flexDirection: "column",
          }}>
           <Text>Pas encore enregistré ?</Text>
           <Button
           variant="gradient"
           gradient={{ from: "orange", to: "red" }}
           style={{ marginBottom: "1%" }}>S'inscrire
            </Button>
          </Group>
        </Card>
      </Center>
    </>
  );
}

export default Login;
