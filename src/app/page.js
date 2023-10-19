"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Grid,
  Typography,
  ButtonBase,
  Box,
  Button,
} from "@mui/material";
import ImgenBar from "./ImgenBar";
import { useState, useEffect } from "react";
import {
  PETPET_URL,
  GIGANTA_URL,
  BUYMEACOFFEE_URL,
  GALLERY_URL,
} from "./Utils";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Slider from "./Slider";

const images = [
  {
    url: "/giganta.gif",
    title: "GIGANTA",
    width: "33%",
    href: GIGANTA_URL,
  },
  {
    url: "/petpet-hand.gif",
    title: "PETPET",
    width: "34%",
    href: PETPET_URL,
  },
  {
    url: "/buymeacoffee.gif",
    title: "BUY ME A COFFEE",
    width: "33%",
    href: BUYMEACOFFEE_URL,
  },
];

const LinksBackground = styled("div")(({ theme }) => ({
  padding: "1vh",
  borderRadius: "1px",
  background: "rgba(17, 32, 44, 0.8)",
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

function Links() {
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          href={image.href}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}

const styles = {
  background: {
    background: "#0c2c66e0",
    padding: "1%",
    borderRadius: "1px",
  },
  slider: {
    background: "#a2d2eb3f",
    borderWidth: "8px",
    borderStyle: "solid none none solid",
    borderColor: "#00368c",
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  banner: {
    color: "#ffffff",
  },
};

function Home() {
  const fullText = "NEXT GENERATION IMAGE GENERATOR!";
  const input = "_";
  const [text, setText] = useState("");
  let index = 0;

  function updateText() {
    if (index < fullText.length) {
      setText(fullText.substring(0, index));
      // if (index % 2 == 0) {
      //     setBannerStyle(styles.banner);
      // } else {
      //     setBannerStyle(styles.bannerDark);
      // }
      index++;
    } else {
      // setTimeout(() => {}, 5000);
      setText("");
      index = 0;
    }
  }

  useEffect(() => {
    const txtInterval = setInterval(updateText, 150);

    return () => {
      clearInterval(txtInterval);
    };
  }, []);

  const contents = (
    <Box style={styles.background}>
      <Typography
        variant="h1"
        style={{ color: "#39f0fa" }}
        fontFamily="Comic Sans MS"
      >
        iMGEN
      </Typography>
      <Typography
        variant="h3"
        style={styles.banner}
        textAlign="center"
        fontFamily="consolas"
      >
        {text + input}
      </Typography>
      <Box style={styles.slider}>
        <Grid container spacing={4}>
          {/* <Grid item xs={2} /> */}
          <Grid item sm={5} xs={12} justifyContent="center">
            <Slider />
          </Grid>
          <Grid item sm={7} xs={12}>
            <Typography variant="h2" color="#ffffff" fontFamily="calibri">
              HAVE FUN
            </Typography>
            <Typography variant="h4" color="#def4fc" fontFamily="calibri">
              AND..
            </Typography>
            <Typography variant="h3" color="#edf1f2" fontFamily="calibri">
              iMGEN MORE
            </Typography>
            <Typography variant="h2" color="#9bcee0" fontFamily="calibri">
              POSSIBILITIES!
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#03193b",
                margin: "1%",
                // top: '50%',
                // left: '50%',
                // transform: 'translate(-50%, -50%)',
              }}
              endIcon={<ReadMoreIcon />}
              href={GALLERY_URL}
            >
              LEARN MORE
            </Button>
          </Grid>
          <Grid item xs={12}>
            <LinksBackground>
              <Links />
            </LinksBackground>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  return <ImgenBar contents={contents} />;
}

export default Home;
