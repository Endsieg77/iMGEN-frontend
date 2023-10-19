'use client'

import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import AlarmIcon from '@mui/icons-material/Alarm';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';
import FilterIcon from '@mui/icons-material/Filter';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  Divider,
  Paper,
  Box,
  Backdrop,
  CircularProgress,
  Stack,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Slide,
  Alert,
  Collapse,
  IconButton,
} from '@mui/material';
import { IMGEN_URL, ACQUIRE_URL, UPLOAD_URL } from './Utils';
import Cookies from 'js-cookie';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  // height: '40vh',
  background: 'rgba(162, 227, 232, 0.5)',
  color: theme.palette.text.secondary,
}));

const Title = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  // height: '40vh',
  background: '#051730',
  color: theme.palette.text.secondary,
}));

const styles = {
  background: {
    // backgroundImage: `url(./background.png)`,
    background: 'rgba(162, 227, 232, 0.2)',
    padding: '10px',
  },
  resultZone: {
    height: '50vh',
    width: '80%',
    objectFit: 'contain',
    marginTop: '2%',
    marginBottom: '2%',
    padding: '3%',
    background: '#3293a869',
    borderRadius: '2%',
  },
  imageZone: {
    height: '50vh',
    width: '100%',
    objectFit: 'contain',
    marginTop: '2%',
    marginBottom: '2%',
    padding: '3%',
    background: '#3293a869',
    borderRadius: '2%',
    // boxShadow: '10% 10%',
  },
  upload: {
    // height: '50vh',
    // width: '100%',
    padding: '30%',
    margin: '15%',
    height: '30%',
    width: '100%',
    top: '50%',
    left: '50%',
    // borderRadius: '30%',
    transform: 'translate(-50%, -50%)',
    background: '#3293a869',
    // objectFit: 'contain'
  },
};

var file = '';
var submitResp = '';

function ImageDisplay({ image, text, premium }) {
  const card = (
    <Stack>
      <Title>
        <Typography fontFamily='consolas' color='#ffffff'>
          {text}
        </Typography>
      </Title>
      <div>
        <img src={image} alt='' style={styles.resultZone} />
      </div>
    </Stack>
  );

  return card;
}

function ImageUpload({
  filename,
  uploadText,
  uploadIcon,
  handleFile,
  src,
  loading,
  premium
}) {
  function ImageDiv() {
    return (
      <>
        <img src={src} style={styles.imageZone} />
        <Typography>{filename}</Typography>
      </>
    );
  }

  const card = (
    <Stack>
      <Title>
        <Typography fontFamily='consolas' color='#ffffff'>
          SELECT AN IMAGE
        </Typography>
      </Title>
      <Grid container justifyContent='center' direction='row' spacing={2}>
        <Grid item xs={6} align='center'>
          <Box justifyContent='center'>
            <ImageDiv />
          </Box>
        </Grid>
        <Grid item align='center'>
          <LoadingButton
            variant='outlined'
            endIcon={uploadIcon}
            component='label'
            loading={loading}
            style={styles.upload}
            disabled={premium}
          >
            <span>{uploadText}</span>
            <input
              type='file'
              onChange={handleFile}
              accept='image/png, image/jpeg, image/jpg'
              hidden
            ></input>
          </LoadingButton>
        </Grid>
      </Grid>
    </Stack>
  );

  return card;
}

function GenerateGif({ generateGif, loading, premium }) {
  return (
    <LoadingButton
      variant='contained'
      startIcon={<AlarmIcon />}
      onClick={generateGif}
      loading={loading}
      disabled={premium}
    >
      <span>iMGEN</span>
    </LoadingButton>
  );
}

function SubmitImage({ onSubmit, loading, premium }) {
  return (
    <>
      <LoadingButton
        variant='contained'
        endIcon={<SendIcon />}
        onClick={onSubmit}
        loading={loading}
        disabled={premium}
      >
        <span>SUBMIT</span>
      </LoadingButton>
    </>
  );
}

function ImgenPrototype({ sample, api, text, premium }) {
  const API_URL = `${IMGEN_URL}${api}`;
  const ALT_IMG = '/alt.jpg';
  // const RESULT_PATH = './result/';

  const [filename, setFilename] = useState('');
  const [src, setSrc] = useState(ALT_IMG);
  const [img, setImg] = useState(sample);
  const [openSubmitAlert, setOpenSubmitAlert] = useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
  });

  const submitAlert = (
    <Collapse in={openSubmitAlert}>
      <Alert
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => {
              setOpenSubmitAlert(false);
            }}
          >
            <Close fontSize='inherit' />
          </IconButton>
        }
        sx={{
          margin: '4px',
        }}
      >
        {`${filename} submit successful!`}
      </Alert>
    </Collapse>
  );

  // const rippleRef = React.useRef(null);
  // const onRippleStart = (e) => {
  //     rippleRef.current.start(e);
  //     setTimeout(() => onRippleStop(), 50);
  // };
  // const onRippleStop = (e) => {
  //     rippleRef.current.stop(e);
  // };
  // const [wh, setWh] = useState(styles.portrait);

  const loginFirst = 'You must login to be granted the desired services o.o';
  const plzChooseAnImage = 'choose an image 1st ;(';
  const uploadFailure = 'image upload failed ;(';
  const generateFailure = 'generatiton failed ;(';
  const imgSelectSuccessMsg = 'Successfully Selected An Image';
  const uploadSuccessMsg = 'Upload Successful!';
  const generateSuccessMsg = 'Generate Successful!';
  var user = useRef(null);
  var userMail = useRef(null);
  var by = useRef('');

  useEffect(() => {
    user.current = JSON.parse(localStorage.getItem('loginfo'));

    if (user.current == null) {
      var cookieMail = Cookies.get('userMail');
      by.current = 'visitor';

      if (cookieMail == null) {
        var now = Date.now().toString();
        var seed = Math.floor(Math.random() * 2048).toString();
        userMail.current = btoa(seed + now);
        Cookies.set('userMail', userMail.current);
      } else {
        userMail.current = cookieMail;
      }
    } else {
      userMail.current = btoa(user.current.email);
      by.current = user.current.name;
      // console.log(by.current);
    }

    if (by.current == 'visitor' && premium) {
        setErrorTxt(loginFirst);
        setDialogOpen(true);
    }

    // console.log(userMail.current);
  }, []);

  function handleSnackbarOpen(message) {
    setSnackBar({ open: true, message });
    setTimeout(() => setSnackBar({ open: false, message: '' }), 1200);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  function onSubmit() {
    // console.log(file);
    // console.log(userMail.current);
    const axios = require('axios');
    let params = new FormData();
    params.append('userMail', userMail.current);
    params.append('image', file);
    setSubmitLoading(true);
    setOpen(true);

    axios
      .post(UPLOAD_URL, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        submitResp = response.data;
        setSubmitLoading(false);
        setOpen(false);
        handleSnackbarOpen(uploadSuccessMsg);
        setOpenSubmitAlert(true);
      })
      .catch((error) => {
        setSubmitLoading(false);
        setOpen(false);
        setDialogOpen(true);

        if (src == ALT_IMG) {
          setErrorTxt(plzChooseAnImage);
        } else {
          setErrorTxt(uploadFailure);
        }
      });
  }

  function handleFile(change) {
    try {
      let inputFile = change.target.files[0];
      file = inputFile;
      setFilename(file.name);
      setUpLoading(true);
      setOpen(true);

      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e) {
        setSrc(this.result);
        setUpLoading(false);
        setOpen(false);
        setOpenSubmitAlert(false);
      };
      handleSnackbarOpen(imgSelectSuccessMsg);
    } catch (error) {
      setUpLoading(false);
      setOpen(false);
      // setDialogOpen(true);
      // setErrorTxt(uploadFailure);
    }
  }

  function generateGif() {
    // console.log(submitResp);
    console.log(userMail.current);
    let path = submitResp.path;
    let name = submitResp.name;
    let data = {
      userMail: userMail.current,
      path: `${path}/${userMail.current}/`,
      name: name,
      by: by.current,
    };
    // console.log(`${path}/${userMail}/`);
    // console.log(name);
    const axios = require('axios');
    setGenerateLoading(true);
    setOpen(true);

    axios
      .get(API_URL, { params: data })
      .then((response) => {
        setImg(`${ACQUIRE_URL}/${userMail.current}/${response.data}`);
        setGenerateLoading(false);
        setOpen(false);
        handleSnackbarOpen(generateSuccessMsg);
        setOpenSubmitAlert(false);
      })
      .catch((error) => {
        setGenerateLoading(false);
        setOpen(false);
        setDialogOpen(true);
        setOpenSubmitAlert(false);

        if (src == ALT_IMG) {
          setErrorTxt(plzChooseAnImage);
        } else {
          setErrorTxt(generateFailure);
        }
      });
  }

  function ImgenSnackBar() {
    return (
      <Snackbar
        open={snackBar.open}
        message={snackBar.message}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Slide}
      />
    );
  }

  return (
    <Box
      style={styles.background}
      //   onMouseDown={onRippleStart}
    >
      <Grid container spacing={4} alignItems='center' justifyContent='center'>
        <Grid item xs={6}>
          <Item>
            <ImageDisplay image={img} text={text} premium={by.current == 'visitor' && premium} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <ImageUpload
              filename={filename}
              uploadText={'+'}
              uploadIcon={<FilterIcon />}
              src={src}
              handleFile={handleFile}
              loading={upLoading}
              premium={by.current == 'visitor' && premium}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <GenerateGif generateGif={generateGif} loading={generateLoading} premium={by.current == 'visitor' && premium} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <SubmitImage onSubmit={onSubmit} loading={submitLoading} premium={by.current == 'visitor' && premium} />
          </Item>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Dialog open={dialogOpen}>
        <DialogTitle>Error!</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorTxt}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
      <ImgenSnackBar />
      {/* <TouchRipple ref={rippleRef} center={false} /> */}
      {submitAlert}
    </Box>
  );
}

export default ImgenPrototype;
