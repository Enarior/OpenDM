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
import { Global } from "@mantine/core";
import "../App.css";
function ViewFiches(createFiche: any) {
  if (createFiche.createFiche === true) {
    return <Text>MEC TA REUSSI</Text>;
  } else {
    return <Text>MEC TA REUSSIazeaze</Text>;


    // PV, emplacement de sort, Classe(autocomplete), race(autocomplete), niveau, inventaire(TransferList), couleur de background de fiche avec colorpicker
  }
}

export default ViewFiches;
