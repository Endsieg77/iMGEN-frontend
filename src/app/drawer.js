"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Divider, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import {
  CLIENT_URL,
  GALLERY_URL,
  BUYMEACOFFEE_URL,
  category2info,
  premiumContents,
} from "./Utils";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SosIcon from "@mui/icons-material/Sos";
import { ArrowBackIos } from "@mui/icons-material";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import { pink } from "@mui/material/colors";

const drawerWidth = 260;

export default function DrawerLeft({ open, onClick }) {
  const sideBarImportants = [
    {
      text: "HOME",
      url: CLIENT_URL,
      icon: <AccountBalanceIcon color="success" />,
    },
    {
      text: "GALLERY",
      url: GALLERY_URL,
      icon: <CollectionsRoundedIcon color="success" />,
    },
  ];

  const categories = Object.keys(category2info);
  const premiumCategories = Object.keys(premiumContents);

  const sideBarUtils = categories.map((key) => {
    return {
      text: key,
      url: category2info[key].url,
      icon: category2info[key].ico,
    };
  });

  const sideBarPremiums = premiumCategories.map((key) => {
    return {
      text: key,
      url: premiumContents[key].url,
      icon: premiumContents[key].ico,
    };
  });

  const sideBarUnimportants = [
    {
      text: "PATREON",
      url: BUYMEACOFFEE_URL,
      icon: <SosIcon sx={{ color: pink[500] }} />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#7bd5dbf5",
            boxShadow: "3px 0px 10px #84c4c0e9",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar justifyContent="flex-end">
          <IconButton edge="end" onClick={onClick} sx={{ marginLeft: "auto" }}>
            <ArrowBackIos />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {sideBarImportants.map((data, index) => (
            <ListItem key={data.text} disablePadding>
              <ListItemButton
                href={data.url}
              >
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText
                  primary={data.text}
                  primaryTypographyProps={{
                    fontFamily: "Cascadia Mono MF",
                    color: "#171254",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ fontFamily: "consolas", color: "#171254" }}>
          SERVICES
        </Divider>
        <List>
          {sideBarUtils.map((data, index) => (
            <ListItem key={data.text} disablePadding>
              <ListItemButton href={data.url}>
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText
                  primary={data.text}
                  primaryTypographyProps={{
                    fontFamily: "Cascadia Mono MF",
                    color: "#241d70",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ fontFamily: "consolas", color: "#171254" }}>
          PREMIUM PLAN
        </Divider>
        <List>
          {sideBarPremiums.map((data, index) => (
            <ListItem key={data.text} disablePadding>
              <ListItemButton href={data.url}>
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText
                  primary={data.text}
                  primaryTypographyProps={{
                    fontFamily: "Cascadia Mono MF",
                    color: "#241d70",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {sideBarUnimportants.map((data, index) => (
          <ListItem key={data.text} disablePadding>
            <ListItemButton href={data.url}>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText
                primary={data.text}
                primaryTypographyProps={{
                  fontFamily: "Cascadia Mono MF",
                  color: "#090530",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </Drawer>
    </Box>
  );
}
