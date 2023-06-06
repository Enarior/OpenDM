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
} from "@mantine/core";
import { SquarePlus, LayoutNavbarExpand } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { Global } from '@mantine/core';
import "../App.css";
function HomeWelcome({setClicked,setCreateFiche} : {setClicked:any,setCreateFiche:any}) {
  return (
    <div className="foreground" style={{backgroundImage:
      "url(" + require("../ressources/images/taverne.png") + ")",}}>
      <Center style={{padding: "8%" }}>
        <h1  style={{fontSize:"15vh",color:"white",fontFamily:"title_medieval"}}>Bienvenue à la taverne !</h1>
      </Center>
      <Flex
        mih={50}
        gap="xl"
        justify="space-around"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button
          variant="white"
          color="yellow"
          radius="md"
          size="xl"
          leftIcon={
            <SquarePlus size={40} strokeWidth={2.5} color={"#4d4a19"} />
          }
          style={{fontFamily:"font_medieval",fontSize:"1.5rem"}}
          onClick={() =>{setClicked(true);setCreateFiche(false)} }
        >
          Voir mes fiches
        </Button>

        <Button
          variant="white"
          color="yellow"
          radius="md"
          size="xl"
          leftIcon={
            <LayoutNavbarExpand size={40} strokeWidth={2.5} color={"#4d4a19"} />
          }
          style={{fontFamily:"font_medieval",fontSize:"1.5rem"}}
          onClick={() =>{setClicked(true);setCreateFiche(true)} }
        >
          Créer une fiche
        </Button>
      </Flex>
    </div>
  );
}

export default HomeWelcome;
