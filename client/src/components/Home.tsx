import React, { useState, useEffect } from "react";
import { useSessionStorage } from "@mantine/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { Text, Button, NavLink } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconCircleOff,
  IconAlertTriangle,
} from "@tabler/icons-react";
import HomeWelcome from "./HomeWelcome";
import ViewFiches from "./ViewFiches";
function Home() {
  const [logged, setLogged] = useSessionStorage({
    key: "logged",
  });
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const [createFiche, setCreateFiche] = useState(false);
    

  if (!logged) {
    return (
      <>
        <Text>
          Vous n'êtes pas connecté, veuillez cliquer sur ce bouton afin d'être
          rédigé vers la page de connexion
        </Text>
        <NavLink
          label="Etre rédirigé vers la page de connexion"
          icon={<IconAlertTriangle size="1rem" stroke={1.5} />}
          onClick={() => {
            navigate("/login");
          }}
        />
      </>
    );
  }
  return (
    //retirer la div
    <div
      className="wrapper"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {!clicked ? (
        <HomeWelcome setClicked={setClicked} setCreateFiche={setCreateFiche} />
      ) : (
        <ViewFiches setClicked={setClicked} />
      )}
    </div>
  );
}

export default Home;
