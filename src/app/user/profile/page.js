"use client";

import { useEffect, useRef, useState } from "react";
import ImgenBar from "@/app/ImgenBar";
import {
  IMGENLIST_URL,
  ACQUIRE_URL,
  DISPLAY_URL,
  category2num,
  ALL,
  stringAvatar,
  DELETEREQ_URL,
} from "@/app/Utils";
import {
  List,
  ListItem,
  ListItemAvatar,
  Card,
  CardHeader,
  Button,
  ButtonGroup,
  Avatar,
  Typography,
  Box,
  Paper,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  IconButton,
  ListItemText,
  Divider,
  Snackbar,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import HistoryIcon from "@mui/icons-material/History";
import SyncIcon from "@mui/icons-material/Sync";

const Title = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // components: <Typography color='#ffffff'/>,
  padding: theme.spacing(1),
  textAlign: "center",
  // height: '40vh',
  background: "#0c0470",
  color: theme.palette.text.secondary,
}));

const FilterBar = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // components: <Typography color='#ffffff'/>,
  padding: theme.spacing(1),
  // textAlign: 'center',
  // height: '40vh',
  background: "rgba(162, 227, 232, 0.7)",
  color: theme.palette.text.secondary,
}));

const styles = {
  background: {
    // backgroundImage: `url(./background.png)`,
    background: "rgba(162, 227, 232, 0.2)",
    padding: "1px",
    margin: "3px",
  },
  pagination: {
    background: "rgba(162, 227, 232, 0.8)",
    padding: "8px",
    borderRadius: "2px",
  },
  items: {
    height: "18vh",
    background: "rgba(162, 227, 232, 0.5)",
    borderRadius: "2%",
    margin: "1%",
    width: "95%",
    padding: "3%",
  },
  imageZone: {
    height: "15vh",
    width: "15vh",
    objectFit: "contain",
    // marginTop: '2%',
    // marginBottom: '2%',
  },
  adsZone: {
    marginTop: "5px",
    height: "100%",
    width: "100%",
    objectFit: "contain",
    // marginTop: '2%',
    // marginBottom: '2%',
  },
};

function Profile() {
  const [change, setChange] = useState(0);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState(() => Object.keys(category2num));
  const [categoryDigits, setCategoryDigits] = useState(
    Object.values(category2num).reduce(
      (accumulator, value) => accumulator | value
    )
  );
  const [imgenList, setImgenList] = useState({
    records: [],
    total: 0,
    size: 0,
    current: 0,
    orders: [],
    optimizeCountSql: false,
    maxLimit: null,
    countId: null,
    pages: 0,
  });
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
  });
  const [revert, setRevert] = useState(false);

  const loginfo = useRef({
    id: "",
    name: "",
    email: "",
    token: "",
  });
  const userMail = useRef("");

  useEffect(() => {
    loginfo.current = JSON.parse(localStorage.getItem("loginfo"));
    userMail.current = btoa(loginfo.current.email);
  }, []);

  function ImgenSnackBar() {
    return (
      <Snackbar
        open={snackBar.open}
        message={snackBar.message}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Slide}
      />
    );
  }

  function handleSnackbarOpen(message) {
    setSnackBar({ open: true, message });
    setTimeout(() => setSnackBar({ open: false, message: "" }), 1200);
  }

  function handleSelectCategory(event, newCategories) {
    // console.log('new cate: ', newCategories);
    setCategories(newCategories);
  }

  function FilterButtons() {
    return (
      <ToggleButtonGroup
        value={categories}
        onChange={handleSelectCategory}
        // color='primary'
        orientation="vertical"
        sx={{
          "& .MuiToggleButtonGroup-grouped": {
            background: "rgba(162, 227, 232, 0.15)",
          },
          "& .MuiToggleButtonGroup-grouped:hover": {
            background: "rgba(162, 227, 232, 0.7)",
          },
        }}
      >
        {Object.keys(category2num).map((item) => (
          <ToggleButton
            value={item}
            sx={{
              fontFamily: "Comic Sans MS",
            }}
          >
            {ALL[item].ico}
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }

  function UpdateStateButtons() {
    return (
      <Box
        sx={{ padding: "5px" }}
        justifyContent="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <ButtonGroup variant="contained" size="large" align="center">
          <Button onClick={() => setRevert(!revert)}>
            <HistoryIcon />
          </Button>
          <Button onClick={() => setChange(change + 1)}>
            <SyncIcon />
          </Button>
        </ButtonGroup>
      </Box>
    );
  }

  const profileCard = (
    <Card
      sx={{
        background: "#7bd5db",
        // width: '100%',
        width: {
          sx: 1.0, // 100%
          // sm: 250,
          // md: 350,
        },
      }}
    >
      <CardHeader
        avatar={<Avatar {...stringAvatar(loginfo.current.name)} />}
        title={loginfo.current.name}
        subheader={loginfo.current.email}
      />
    </Card>
  );

  useEffect(() => {
    var tempCategory = 0;
    categories.forEach((value, index) => (tempCategory |= category2num[value]));
    setCategoryDigits(tempCategory);
  }, [categories]);

  useEffect(() => {
    // console.log(userMail);
    const axios = require("axios");
    axios
      .get(IMGENLIST_URL, {
        params: {
          pageCount: page,
          category: categoryDigits,
          pageSize: 10,
          userMail: userMail.current,
          revert: revert,
        },
      })
      .then((response) => {
        setImgenList(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [page, categoryDigits, change, revert]);

  useEffect(() => {
    if (page > imgenList.pages) setPage(imgenList.pages);
  }, [imgenList]);

  function handlePageChange(event, value) {
    setPage(value);
  }

  function handleDeleteItem(event) {
    // console.log(event.currentTarget.value);
    const target = JSON.parse(event.currentTarget.value);
    const userMail = target.email;
    const name = target.name;

    const axios = require("axios");
    axios
      .delete(DELETEREQ_URL, {
        params: {
          userMail: userMail,
          name: name,
        },
      })
      .then((response) => {
        setChange(change + 1);
        handleSnackbarOpen("delete successful");
      })
      .catch((error) => console.log(error));
  }

  const galleryList = (
    <List
      sx={{
        // height: '185vh',
        width: "100%",
      }}
      align="center"
    >
      {imgenList.records.map((item) => {
        const path = `/${item.email}/${item.name}`;
        const imgsrc = `${ACQUIRE_URL}${path}`;
        const dispsrc = `${DISPLAY_URL}${path}`;
        const deleteTarget = {
          email: item.email,
          name: item.name,
        };
        return (
          <ListItem
            style={styles.items}
            align="center"
            // className="ListItem"
            // sx={{
            //   "&:hover $child": {
            //     backgroundColor: "#000000",
            //   },
            // }}
            secondaryAction={
              <IconButton
                value={JSON.stringify(deleteTarget)}
                onClick={handleDeleteItem}
              >
                <DeleteForeverIcon />
              </IconButton>
            }
          >
            <a href={dispsrc}>
              <ListItemAvatar>
                <Avatar
                  src={imgsrc}
                  alt="/imgen.png"
                  style={styles.imageZone}
                />
              </ListItemAvatar>
            </a>
            <ListItemText
              primary={item.name.split(".")[0]}
              primaryTypographyProps={{
                fontFamily: "Comic Sans MS",
                color: "#051730",
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );

  const contents = (
    <Box style={styles.background}>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <FilterBar>
            <Stack
              alignContent="center"
              sx={{
                width: "90%",
                padding: "5%",
              }}
            >
              {profileCard}
              <Divider textAlign="left">filters: </Divider>
              {/* <Typography textAlign='left'></Typography> */}
              <FilterButtons />
              <UpdateStateButtons />
            </Stack>
            <Divider />
            <img src="/ads.png" style={styles.adsZone} />
          </FilterBar>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Title>
            <ColorLensIcon color="secondary" />
            <AutoAwesomeIcon color="primary" />
            <ColorLensIcon color="secondary" />
            <Typography variant="h4" color="#ffffff" fontFamily="consolas">
              {"- Your MASTERpieces -"}
            </Typography>
          </Title>
          <Stack
            alignItems="center"
            sx={{
              width: "100%",
            }}
          >
            {galleryList}
            <Box style={styles.pagination}>
              <Pagination
                page={page}
                count={imgenList.pages}
                onChange={handlePageChange}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <ImgenSnackBar />
    </Box>
  );

  return <ImgenBar contents={contents} />;
}

export default Profile;
