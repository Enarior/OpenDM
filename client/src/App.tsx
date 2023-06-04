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
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const dark = colorScheme === "dark";
  useHotkeys([["alt+b", () => toggleColorScheme()]]);
  return (
    <MantineProvider
      theme={{ colorScheme: colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
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
