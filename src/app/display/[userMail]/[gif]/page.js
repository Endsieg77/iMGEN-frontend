"use client";

// import { useRouter } from 'next/router';
import ImgenBar from "@/app/ImgenBar";
import React, { useEffect, useState } from "react";
import { ACQUIRE_URL, DETAILREQ_URL, stringAvatar } from "@/app/Utils";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { useRouter } from "next/navigation";

const Title = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // components: <Typography color='#ffffff'/>,
  padding: theme.spacing(1),
  textAlign: "center",
  //   alignItems: "center",
  //   display: "flex",
  // height: '40vh',
  background: "#051730",
  color: theme.palette.text.secondary,
}));

const ImgenBox = styled(Box)({
  background: "rgba(162, 227, 232, 0.5)",
  textAlign: "center",
  width: "100%",
  height: "85vh",
  margin: "2%",
  padding: "1%",
  // objectFit: 'contain',
});

// const styles = {
//   imageZone: {
//     height: "70vh",
//     width: "100%",
//     objectFit: "contain",
//     marginTop: "2%",
//     marginBottom: "2%",
//   },
// };

export default function Display({ params }) {
  const router = useRouter();

  const userMail = params.userMail;
  const gif = params.gif;
  const src = `${ACQUIRE_URL}/${userMail}/${gif}`;
  const [art, setArt] = useState({
    id: -1,
    email: "",
    category: 0,
    name: "",
    illustrator: "",
  });
  const image = (
    <Card
      sx={{
        background: "#7bd5db3f",
        height: "90%",
        // width: '100%',
        // width: {
        //   sx: 1.0, // 100%
        //   // sm: 250,
        //   // md: 350,
        // },
      }}
    >
      <CardHeader
        avatar={<Avatar {...stringAvatar(art.illustrator)} />}
        title={`${art.name.split('.')[0]} by: ${art.illustrator}`}
        titleTypographyProps={{
            variant: 'h5',
            fontFamily: 'Cascadia Mono MF'
        }}
        subheader={atob(art.email)}
      />
      <CardMedia component="img" sx={{
        height: "80%",
        objectFit: 'contain'
      }} image={src} />
    </Card>
  );

  useEffect(() => {
    const axios = require("axios");
    axios
      .get(`${DETAILREQ_URL}/${userMail}/${gif}`)
      .then((response) => setArt(response.data));
  }, []);

  const contents = (
    <Grid container>
      <Grid item sm={1} xs={0}></Grid>
      <Grid item sm={10} xs={12}>
        <ImgenBox>
          <Title>
            <Grid container>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.back()}
                >
                  <ReplyAllIcon />
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  fontFamily="consolas"
                  variant="h4"
                  textAlign="center"
                  color="#ffffff"
                >
                  GALLERY
                </Typography>
              </Grid>
              <Grid item xs={11}></Grid>
            </Grid>
          </Title>
          {image}
        </ImgenBox>
      </Grid>
      <Grid item sm={1} xs={0}></Grid>
    </Grid>
  );

  return (
    <>
      <ImgenBar contents={contents} />
    </>
  );
}
