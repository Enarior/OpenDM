import React, { useState } from "react";

import Login from "./components/Login";
import Home from "./components/Home";
import Toto from "./components/Toto";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";
import {
  MantineProvider,
  Center,
  Button,
  TextInput,
  Card,
  ColorScheme,
  ColorSchemeProvider,
  ActionIcon,
  useMantineColorScheme,
  Navbar,
  Header,
  AppShell,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

function App() {
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
  return (
    //MantineProvider permet de mettre en place le dark mode, on entoure tout le reste de l'application avec
    <MantineProvider
      theme={{ colorScheme: colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
     {/*AppShell permet de mettre en place le header et le footer, on entoure le reste de l'application avec*/} 
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <h1 style={{paddingRight:"88%"}}>OpenDM</h1>
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
            <Route path="/" element={<Toto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
