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
  const [userLogged, setUserLogged] = useSessionStorage({
    key: "username",
    defaultValue: "",
  });
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const [createFiche, setCreateFiche] = useState(false);
    

  if (!logged) {
    //Page de redirection si l'utilisateur n'est pas connecté
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
            setUserLogged("");
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
      {/** on regarde la valeur du hook pour savoir si on affiche la page d'accueil ou bien la page de visualisation des fiches */}
      {!clicked ? (
        <HomeWelcome setClicked={setClicked} setCreateFiche={setCreateFiche} />
      ) : (
        <ViewFiches setClicked={setClicked} />
      )}
    </div>
  );
}

export default Home;
