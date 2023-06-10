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
  Flex,
  SimpleGrid,
  Image,
  Badge,
  Title,
  Breadcrumbs,
} from "@mantine/core";
import { SquarePlus, LayoutNavbarExpand, Anchor } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { Global } from "@mantine/core";
import "../App.css";


function SmallFiche({open,openEdit,openUsername,username,race,classe,level,setReloadDelete}:{open:any,openEdit:any,openUsername:any,username:String,classe:String,level:String,race:String,setReloadDelete:any}) {
  const items = [{ Level: level }, { Race: race }, { Classe: classe }].map(
    (item, index) => (
      <Text>
        {Object.keys(item)[0]} : {Object.values(item)[0]}
      </Text>
    )
  );
  const deleteSheets = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      };
      console.log(username);
      const response = await fetch(
        "http://localhost:9000/api/sheets/delete",
        requestOptions
      );

      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{}} variant="gradien">
      <Card.Section>
        <Title
          order={1}
          style={{
            textAlign: "left",
            fontFamily: "font_medieval",
            fontSize: "4vh",
            paddingLeft: "2%",
          }}
        >
         {username}
        </Title>
        <Flex
          mih={50}
          bg="rgba(0, 0, 0, .3)"
          gap="xl"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
          style={{width:"auto",paddingLeft:"2%",paddingRight:"2%"}}
        >
          <Breadcrumbs separator="|">{items}</Breadcrumbs>
        </Flex>
      </Card.Section>
      <Card.Section style={{ paddingLeft: "1%",paddingTop:"1%",paddingBottom:"1%" }}>
        <Flex
          gap="xl"
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={() =>{open(true);openEdit(true);openUsername(username)}}
          >View</Button>
          <Button
          variant="gradient"
          gradient={{ from: "#ff0000", to: "red" }}
          onClick={() =>{deleteSheets();setReloadDelete(true)}}
          >Delete</Button>
        </Flex>
      </Card.Section>
    </Card>
  );
}

export default SmallFiche;
