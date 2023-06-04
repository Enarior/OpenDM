import React, { useState, useEffect } from "react";
import { useSessionStorage } from "@mantine/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { Text,Button,NavLink } from "@mantine/core";
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconAlertTriangle } from '@tabler/icons-react';
import HomeWelcome from "./HomeWelcome";
function Home() {
  const [logged, setLogged] = useSessionStorage({
    key: "logged",
  });
  const navigate = useNavigate();
  if (!logged) {
    return (
      <>
        <Text>
          Vous n'êtes pas connecté, veuillez cliquer sur ce bouton afin d'être
          rédigé vers la page de connexion
        </Text>
        <NavLink label="With icon" icon={<IconAlertTriangle size="1rem" stroke={1.5} />} onClick={()=>{navigate("/login")}}/>
      </>
    );
  }
  return (
    <div className="wrapper" style={{width:"100%",height:"102%",backgroundImage:
    "url(" + require("../ressources/images/taverne.png") + ")",}}>
      <HomeWelcome />
    </div>
  );
}

export default Home;
