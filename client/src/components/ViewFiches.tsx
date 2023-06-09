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
  Title,
  Breadcrumbs,
  PinInput,
  Autocomplete,
  Image,
  Badge,
  Avatar,
  Checkbox,
  Radio,
  SelectItemProps,
  MantineColor,
  useMantineTheme,
  NumberInput,
  TransferList,
  TransferListData,
} from "@mantine/core";
import { SquarePlus, LayoutNavbarExpand, User } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { Global } from "@mantine/core";
import "../App.css";
import { create } from "domain";
import { Ce } from "tabler-icons-react";
import SmallFiche from "./SmallFiche";
import { forwardRef } from "react";
import { get } from "http";
function ViewFiches(createFiche: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const [userLogged, setUserLogged] = useSessionStorage({
    key: "username",
    defaultValue: "",
  });
  const [count, setCount] = useState(0);
  const [sheets, setSheets] = useState<any[]>([]);

  //Hooks for creating a character by the modal
  //Level
  const [levelH, setlevelH] = useState<number | "">(0);
  //Nom
  const [nomH, setNomH] = useState("");
  //Classe
  const [classeH, setClasseH] = useState<string | null>(null);
  //Race
  const [raceH, setRaceH] = useState<string | null>(null);
  //Force
  const [forceH, setForceH] = useState<number | "">(0);
  // Dextérité
  const [dexteriteH, setDexteriteH] = useState<number | "">(0);
  // Constitution
  const [constitutionH, setConstitutionH] = useState<number | "">(0);
  // Intelligence
  const [intelligenceH, setIntelligenceH] = useState<number | "">(0);
  //Sagesse
  const [sagesseH, setSagesseH] = useState<number | "">(0);
  // Charisme
  const [charismeH, setCharismeH] = useState<number | "">(0);
  // PV
  const [pvH, setPvH] = useState<number | "">(0);
  // CA
  const [caH, setCaH] = useState<number | "">(0);
  // Emplacement de sorts
  const [emplacementSortH, setEmplacementSortH] = useState<number | "">(0);

  //Construction de l'autocomplete des classes
  const charactersList = [
    {
      image: require("../ressources/images/classes/barbare.jpg"),
      label: "Barbare",
    },
    {
      image: require("../ressources/images/classes/barde.jpeg"),
      label: "Barde",
    },
    {
      image: require("../ressources/images/classes/clerc.jpeg"),
      label: "Druide",
    },
    {
      image: require("../ressources/images/classes/druide.jpeg"),
      label: "Guerrier",
    },
    {
      image: require("../ressources/images/classes/ensorceleur.jpeg"),
      label: "Magicien",
    },
    {
      image: require("../ressources/images/classes/moine.jpeg"),
      label: "Moine",
    },
    {
      image: require("../ressources/images/classes/paladin.jpeg"),
      label: "Paladin",
    },
    {
      image: require("../ressources/images/classes/clerc.jpeg"),
      label: "Prêtre",
    },
    {
      image: require("../ressources/images/classes/rodeur.jpeg"),
      label: "Rôdeur",
    },
    {
      image: require("../ressources/images/classes/roublard.jpeg"),
      label: "Roublard",
    },
  ];

  const data = charactersList.map((item) => ({ ...item, value: item.label }));
  interface ItemProps extends SelectItemProps {
    color: MantineColor;
    image: string;
  }

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ value, image, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text>{value}</Text>
          </div>
        </Group>
      </div>
    )
  );

  //Call the API on /api/sheets to get a JSON of all the sheets of the user
  const getSheets = async () => {
    try {
      const user = window.sessionStorage.getItem("username");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.substring(1, user.length - 1) }),
      };

      const response = await fetch(
        "http://localhost:9000/api/sheets",
        requestOptions
      );

      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const getCountSheets = async () => {
    try {
      const user = window.sessionStorage.getItem("username");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.substring(1, user.length - 1) }),
      };

      const response = await fetch(
        "http://localhost:9000/api/sheets/count",
        requestOptions
      );

      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const createSheet = async () => {
    try {
      const user = window.sessionStorage.getItem("username");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name : nomH,
          level : levelH,
          classe : classeH,
          race : raceH,
          hp : pvH,
          ca : caH,
          sorts : emplacementSortH,
          STR : forceH,
          DEX : dexteriteH,
          CON : constitutionH,
          INT : intelligenceH,
          WIS : sagesseH,
          CHA : charismeH,
          username: user?.substring(1, user.length - 1),
        }),
      };
      const response = await fetch(
        "http://localhost:9000/api/sheets/add",
        requestOptions
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getSheets().then((data) => {
      console.log(data);
      setSheets(data);
    });

    getCountSheets().then((data) => {
      console.log(data);
      setCount(data);
    });
  }, []);
  
  return (
    //retirer la di

    <SimpleGrid cols={1} spacing="xl">
      <Modal opened={opened} onClose={close} title="Fiche de perso" size="auto">
        <SimpleGrid cols={1} spacing="xl">
          <Flex
            direction="row"
            justify="space-between"
            align="center"
            style={{ width: "100%" }}
          >
            <TextInput
              label="Nom de l'aventurier"
              style={{ width: "25vh" }}
              onChange={(event) => setNomH(event.currentTarget.value)}
            ></TextInput>
            <NumberInput
              label="Niveau"
              min={1}
              defaultValue={1}
              style={{ width: "10vh", textAlign: "center" }}
              onChange={setlevelH}
            />
          </Flex>
          <Flex justify={"space-between"}>
            <Autocomplete
              label="Votre classe"
              placeholder="Pick one"
              itemComponent={AutoCompleteItem}
              dropdownPosition="bottom"
              limit={15}
              data={data}
              onChange={setClasseH}
            />
            <Autocomplete
              label="Votre race"
              placeholder="Pick one"
              dropdownPosition="bottom"
              limit={15}
              data={[
                "Elfe",
                "Halfelin",
                "Humain",
                "Nain",
                "Demi-Elfe",
                "Demi-Orc",
                "Drakéide",
                "Gnome",
                "Tiffelin",
              ]}
              onChange={setRaceH}
            />
          </Flex>
          <Flex direction="row" justify="space-between" align="center">
            <Card shadow="md" padding="md" radius="lg" withBorder>
              <SimpleGrid cols={2} spacing="xl">
                <NumberInput
                  label="Force"
                  labelProps={{ color: "orange" }}
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                  onChange={setForceH}
                />
                <NumberInput
                  label="Dextérité"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                  onChange={setDexteriteH}
                />
                <NumberInput
                  label="Constitution"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                  onChange={setConstitutionH}
                />
                <NumberInput
                  label="Intelligence"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                  onChange={setIntelligenceH}
                />
                <NumberInput
                  label="Sagesse"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                  onChange={setSagesseH}
                />
                <NumberInput
                  label="Charisme"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                  onChange={setCharismeH}
                />
              </SimpleGrid>
            </Card>
            <Flex direction="column" style={{ paddingLeft: "5%" }}>
              <NumberInput
                label="PV"
                min={1}
                style={{ width: "15vh", textAlign: "center" }}
                onChange={setPvH}
              />
              <NumberInput
                label="CA"
                min={1}
                style={{ width: "15vh", textAlign: "center" }}
                onChange={setCaH}
              />
              <NumberInput
                label="Emplacements de sorts"
                min={1}
                style={{ width: "15vh", textAlign: "center" }}
                onChange={setEmplacementSortH}
              />
            </Flex>
          </Flex>
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            onClick={() => {
              createSheet();
              close();
            }}
          >
            Enregistrer
          </Button>
        </SimpleGrid>
      </Modal>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title
            order={1}
            style={{
              textAlign: "left",
              fontFamily: "font_medieval",
              fontSize: "7vh",
            }}
          >
            Mes personnages
          </Title>
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            style={{ marginRight: "1%" }}
            onClick={() => open()}
          >
            Créer un nouveau personnage
          </Button>
        </div>
        <Text style={{ fontSize: "2.5vh" }}>Nombre de fiche : {count}</Text>
      </div>
      <div style={{}}>
        <SimpleGrid cols={3} spacing="xl">
          <>
            {Object.keys(sheets).flatMap(function (key, value) {
              return (
                <SmallFiche
                  open={open}
                  username={sheets[value].username}
                  race={sheets[value].race}
                  classe={sheets[value].classe}
                  level={sheets[value].level}
                />
              );
            })}
          </>
        </SimpleGrid>
      </div>
    </SimpleGrid>
  );

  // PV, emplacement de sort, Classe(autocomplete), race(autocomplete), niveau, inventaire(TransferList), couleur de background de fiche avec colorpicker
}

export default ViewFiches;
