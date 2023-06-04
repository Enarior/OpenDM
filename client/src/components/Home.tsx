import React, { useState, useEffect } from "react";
import { useSessionStorage } from "@mantine/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { Text,Button,NavLink } from "@mantine/core";
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconAlertTriangle } from '@tabler/icons-react';

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
    <div className="wrapper">
      <div
        className="foreground"
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage: `url("../ressources/images/taverne.png")`,
        }}
      >
        <button id="viewSheet">Voir mes fiches</button>
        <button id="createSheet">Créer une fiche</button>
      </div>
      <h1>Welcome in your tavern !</h1>
      <div id="containerSheet">
        <article></article>
      </div>
      <div id="containerCreateSheet"></div>
    </div>
  );
}

export default Home;
