"use client";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Divider,
  Stack,
  Avatar,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerLeft from "./drawer";
import { useState, useEffect, useReducer, useRef } from "react";
import ImgenIcon from "./ImgenIcon";
import {
  LOG_IN_URL,
  SIGN_UP_URL,
  AUTO_LOG_IN_REQ_URL,
  stringAvatar,
  CLIENT_URL,
  PROFILE_URL,
} from "./Utils";
import { Navigation } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function ImgenBar({ contents }) {
  const [open, setOpen] = useState(false);
  const loginfo = useRef({
    id: "",
    name: "",
    email: "",
    token: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  function handleDrawerOpen() {
    if (open == true) {
      setOpen(false);
    } else setOpen(true);
  }

  function onLogout() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("loginfo");
      //   localStorage.setItem("loginStatus", "OUT");
    }
    setIsLoggedIn(false);
    router.push(CLIENT_URL);
  }

  function handleScrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  useEffect(() => {
    // do auto login
    loginfo.current = JSON.parse(localStorage.getItem("loginfo"));

    const handleMainClicked = (event) => {
      setOpen(false);
    };

    document
      .getElementById("main")
      .addEventListener("click", handleMainClicked);

    if (loginfo.current != null) {
      const token = loginfo.current.token;
      const axios = require("axios");

      // send request for auto login:
      axios
        .get(AUTO_LOG_IN_REQ_URL, {
          params: { token: token },
        })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("loginfo", JSON.stringify(response.data));
            // localStorage.setItem("loginStatus", "OK");
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          localStorage.removeItem("loginfo");
          // localStorage.setItem("loginStatus", "BAD");
          setIsLoggedIn(false);
        });
    }

    return () =>
      document
        .getElementById("main")
        .removeEventListener("click", handleMainClicked);
  }, []);

  const name = loginfo.current == null ? null : loginfo.current.name;
  const avatar = name == null ? null : <Avatar {...stringAvatar(name)} />;
  // const isLoggedIn = localStorage.getItem('loginStatus') == 'OK';

  const loginButtons = (
    <>
      <Button size="small" color="inherit" aria-label="menu" href={LOG_IN_URL}>
        LOG-IN
      </Button>
      {/* <Divider /> */}
      <Button size="small" color="inherit" aria-label="menu" href={SIGN_UP_URL}>
        SIGN-UP
      </Button>
    </>
  );

  const logoutButtons = (
    <>
      <a href={PROFILE_URL} style={{ textDecoration: "none" }}>
        {avatar}
      </a>
      {/* <Divider
        style={{
          background: '#ffffff'
        }}
      /> */}
      <Button size="small" color="inherit" aria-label="menu" onClick={onLogout}>
        LOG-OUT
      </Button>
    </>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#051730" }}>
        <Toolbar variant="dense" edge="start">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <ImgenIcon size="50px" />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            fontFamily="Lucida Sans Typewriter"
          >
            {" - NEXT GENERATION IMAGE GENERATOR - "}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ marginLeft: "auto" }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {isLoggedIn ? logoutButtons : loginButtons}
          </Stack>
        </Toolbar>
      </AppBar>
      <DrawerLeft open={open} onClick={handleDrawerOpen} />
      <div id="main">{contents}</div>
      <AppBar
        sx={{
          top: "auto",
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          pointerEvents: "none",
        }}
      >
        <div align="center">
          <Typography fontFamily="consolas">
            iMGEN 2023, Offensive77(C) Copyright Reserved.
          </Typography>
        </div>
      </AppBar>
      <Fab
        style={{
          left: "auto",
          right: 15,
          top: "auto",
          bottom: 15,
          position: "fixed",
        }}
        onClick={handleScrollTop}
        // disable={hideScrollTop}
        color="primary"
      >
        <Navigation />
      </Fab>
    </>
  );
}

export default ImgenBar;
