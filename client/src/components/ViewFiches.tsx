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
} from "@mantine/core";
import { SquarePlus, LayoutNavbarExpand } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { Global } from "@mantine/core";
import "../App.css";
import { create } from "domain";
import { Ce } from "tabler-icons-react";
import SmallFiche from "./SmallFiche";
import { forwardRef } from "react";
function ViewFiches(createFiche: any) {
  const [opened, { open, close }] = useDisclosure(false);

  //Construction de l'autocomplete des classes
  const charactersList = [
    {
      image: require("../ressources/images/classes/barbare.jpg"),
      label: "Barbare",
    },
    {
      image:  require("../ressources/images/classes/barde.jpeg"),
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
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Moine",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Paladin",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Prêtre",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Rôdeur",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
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

  return (
    //retirer la di

    <SimpleGrid cols={1} spacing="xl">
      <Modal opened={opened} onClose={close} title="Fiche de perso">
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
            <Group
              position="center"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Text>Niveau</Text>
              <PinInput length={1} />
            </Group>
          </Flex>
          <Flex>
            <Autocomplete
              label="Votre classe"
              placeholder="Pick one"
              itemComponent={AutoCompleteItem}
              data={data}
              dropdownPosition="bottom"
              filter={(value, item) =>
                item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
            />
            <Autocomplete
              label="Votre race"
              placeholder="Pick one"
              data={["React", "Angular", "Svelte", "Vue"]}
            />
          </Flex>
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
        <Text style={{ fontSize: "2.5vh" }}>Nombre de fiche : {2 + 2}</Text>
      </div>
      <div style={{}}>
        <SimpleGrid cols={3} spacing="xl">
          <SmallFiche open={open} />
          <SmallFiche open={open} />
          <SmallFiche open={open} />
          <SmallFiche open={open} />
          <SmallFiche open={open} />
          <SmallFiche open={open} />
        </SimpleGrid>
      </div>
    </SimpleGrid>
  );

  // PV, emplacement de sort, Classe(autocomplete), race(autocomplete), niveau, inventaire(TransferList), couleur de background de fiche avec colorpicker
}

export default ViewFiches;
