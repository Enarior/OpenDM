import React, { useState,useEffect } from "react";

import Login from "./components/Login";
import Home from "./components/Home";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";
import {MantineProvider,  Center,  Button,  TextInput,  Card,  ColorScheme,  ColorSchemeProvider,  ActionIcon,  useMantineColorScheme,  Navbar,  Header,  AppShell,  Title,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useSessionStorage } from "@mantine/hooks";
import { Text } from '@mantine/core';
function App() {
  ////////////////////////////////***DARK THEME */
  //Dark mode qui se stocke dans le local storage
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  //Fonction qui permet de changer le mode
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const dark = colorScheme === "dark";
  //Raccourci clavier pour changer le mode
  useHotkeys([["alt+b", () => toggleColorScheme()]]);
  const [logged, setLogged] = useSessionStorage({
    key: "logged",
    defaultValue: false,
  });
  const [userLogged, setUserLogged] = useSessionStorage({
    key: "username",
    defaultValue: "",
  });
  ////////////////////////////////***ROUTING */

  function deconnexion(){
    setLogged(false);
    return <Navigate to="/login" />;
  }
 
  return (
    //MantineProvider permet de mettre en place le dark mode, on entoure tout le reste de l'application avec
    <MantineProvider
      theme={{ colorScheme: colorScheme}}
      withGlobalStyles
      withNormalizeCSS
    >
     {/*AppShell permet de mettre en place le header et le footer, on entoure le reste de l'application avec*/} 
      <AppShell
        padding="md"
        
        header={
          <Header height={60} p="xs" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Title order={1} style={{paddingRight:"76%"}} 
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          >OpenDM</Title>
          <Text style={{marginRight:"3%"}}>{userLogged}</Text>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              style={{ marginRight: "1%" }}
              onClick={() => deconnexion()}
            >Déconnexion</Button>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? (
                <IconSun size="1.1rem" />
              ) : (
                <IconMoonStars size="1.1rem" />
              )}
            </ActionIcon>
            
          </Header>
        }
      >
        <Router>
          <Routes>
            {/** Redirection automatique vers la page de login lorsque l'utilisateur n'est pas connecté ou vers la page de home lorsque l'utilisateur
             * est connecté
             */}
            <Route path="/" element={<Navigate to="login"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
