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
  const [sheets,setSheets] = useState([]);
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
        body: JSON.stringify({ username: user?.substring(1, user.length - 1)}),
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
        body: JSON.stringify({ username: user?.substring(1, user.length - 1)}),
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

  useEffect(() => {
    getSheets().then((data) => {
      console.log(data);
      setSheets(data);
    });

    getCountSheets().then((data) => {
      console.log(data);
      setCount(data.count);
    }
    )
  }, []);
  
  

  return (
    //retirer la di

    <SimpleGrid cols={1} spacing="xl">
      <Modal opened={opened} onClose={close} title="Fiche de perso" size="auto" >
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
            ></TextInput>
            <NumberInput
              label="Niveau"
              min={1}
              style={{ width: "10vh", textAlign: "center" }}
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
            />
          </Flex>
          <Flex direction="row" justify="space-between" align="center">
            <Card shadow="md" padding="md" radius="lg" withBorder >
              <SimpleGrid cols={2} spacing="xl">
                <NumberInput
                  label="Force"
                  labelProps={{ color: "orange" }}
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                />
                <NumberInput
                  label="Dextérité"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                />
                <NumberInput
                  label="Constitution"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                />
                <NumberInput
                  label="Intelligence"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                />
                <NumberInput
                  label="Sagesse"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                />
                <NumberInput
                  label="Charisme"
                  min={1}
                  max={20}
                  style={{ width: "15vh", textAlign: "center" }}
                />
              </SimpleGrid>
            </Card>
            <Flex direction="column" style={{paddingLeft:"5%"}}>
              <NumberInput
                label="PV"
                min={1}
                style={{ width: "15vh", textAlign: "center" }}
              />
              <NumberInput
                label="CA"
                min={1}
                style={{ width: "15vh", textAlign: "center" }}
              />
              <NumberInput
                label="Emplacements de sorts"
                min={1}
                style={{ width: "15vh", textAlign: "center" }}
              />
            </Flex>
          </Flex>
          <Button variant="gradient" gradient={{ from: "orange", to: "red" }}>Enregistrer</Button>
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
            My Characters
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
        
        </SimpleGrid>
      </div>
    </SimpleGrid>
  );

  // PV, emplacement de sort, Classe(autocomplete), race(autocomplete), niveau, inventaire(TransferList), couleur de background de fiche avec colorpicker
}

export default ViewFiches;
