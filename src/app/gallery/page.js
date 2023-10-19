"use client";

import { useEffect, useState } from "react";
import ImgenBar from "@/app/ImgenBar";
import {
  IMGENLIST_URL,
  ACQUIRE_URL,
  DISPLAY_URL,
  category2num,
  ALL,
} from "@/app/Utils";
import {
  ImageList,
  ImageListItem,
  Divider,
  Typography,
  Box,
  Paper,
  Pagination,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ImgenIcon from "../ImgenIcon";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import ImagesearchRollerIcon from "@mui/icons-material/ImagesearchRoller";
import HistoryIcon from "@mui/icons-material/History";
import SyncIcon from "@mui/icons-material/Sync";

const Title = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // components: <Typography color='#ffffff'/>,
  padding: theme.spacing(1),
  textAlign: "center",
  // height: '40vh',
  background: "#051730",
  color: theme.palette.text.secondary,
}));

const FilterBar = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // components: <Typography color='#ffffff'/>,
  padding: theme.spacing(1),
  // textAlign: 'center',
  // height: '40vh',
  //   width: '80%',
  background: "rgba(162, 227, 232, 0.7)",
  color: theme.palette.text.secondary,
}));

const styles = {
  background: {
    // backgroundImage: `url(./background.png)`,
    background: "rgba(162, 227, 232, 0.2)",
    padding: "10px",
  },
  pagination: {
    background: "rgba(162, 227, 232, 0.8)",
    padding: "8px",
    borderRadius: "2px",
  },
  items: {
    height: "38vh",
    background: "rgba(162, 227, 232, 0.5)",
    borderRadius: "3%",
    margin: "1%",
    width: "90%",
  },
  imageZone: {
    height: "37vh",
    width: "95%",
    objectFit: "contain",
    // marginTop: '2%',
    // marginBottom: '2%',
  },
};

function Gallery() {
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
  const [revert, setRevert] = useState(false);

  function handleSelectCategory(event, newCategories) {
    // console.log('new cate: ', newCategories);
    setCategories(newCategories);
  }

  function FilterButtons() {
    return (
      <ToggleButtonGroup
        value={categories}
        onChange={handleSelectCategory}
        orientation="vertical"
        sx={{
          "& .MuiToggleButtonGroup-grouped": {
            background: "rgba(162, 227, 232, 0.15)",
          },
          "& .MuiToggleButtonGroup-grouped:hover": {
            background: "rgba(162, 227, 232, 0.7)",
          },
        }}
        // color='primary'
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
        // width='100%'
      >
        <ButtonGroup variant="contained" size="small" sx={{ width: "100%" }}>
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

  useEffect(() => {
    var tempCategory = 0;
    // console.log(categories);
    categories.forEach((value, index) => (tempCategory |= category2num[value]));
    // console.log(tempCategory);
    setCategoryDigits(tempCategory);
  }, [categories]);

  useEffect(() => {
    const axios = require("axios");
    axios
      .get(IMGENLIST_URL, {
        params: {
          pageCount: page,
          category: categoryDigits,
          revert: revert,
        },
      })
      .then((response) => {
        setImgenList(response.data);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [page, categoryDigits, revert, change]);

  useEffect(() => {
    if (page > imgenList.pages) setPage(imgenList.pages);
  }, [imgenList]);

  function handlePageChange(event, value) {
    setPage(value);
  }

  const galleryList = (
    <ImageList
      cols={3}
      sx={{
        height: "130vh",
        width: "100%",
      }}
      align="center"
    >
      {imgenList.records.map((item) => {
        const path = `/${item.email}/${item.name}`;
        const imgsrc = `${ACQUIRE_URL}${path}`;
        const dispsrc = `${DISPLAY_URL}${path}`;
        return (
          <ImageListItem style={styles.items} align="center">
            <a href={dispsrc}>
              <img src={imgsrc} alt="/imgen.png" style={styles.imageZone} />
            </a>
            <Typography color="#051730" fontFamily="Comic Sans MS">
              {item.name.split(".")[0]}
            </Typography>
          </ImageListItem>
        );
      })}
    </ImageList>
  );

  const contents = (
    <Box style={styles.background}>
      <Grid container spacing={2}>
        <Grid item sm={2} xs={12}>
          <FilterBar>
            <Stack alignItems="center">
              <ImgenIcon size="80%" />
              <Divider textAlign="left">filters: </Divider>
              <FilterButtons />
              <UpdateStateButtons />
            </Stack>
          </FilterBar>
        </Grid>
        <Grid item sm={10} xs={12}>
          <Title>
            <ImagesearchRollerIcon color="secondary" />
            <LocalActivityIcon color="primary" />
            <ImagesearchRollerIcon color="secondary" />
            <Typography variant="h4" color="#ffffff" fontFamily="consolas">
              {"- iMGEN SHOWCASE -"}
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
    </Box>
  );

  return <ImgenBar contents={contents} />;
}

export default Gallery;
