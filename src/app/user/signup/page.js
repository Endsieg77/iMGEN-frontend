'use client'

import {
  Alert,
  Button,
  TextField,
  Dialog,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ImgenIcon from '../../ImgenIcon';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { LOG_IN_URL, SIGN_UP_REQ_URL, publicKey } from '../../Utils';
import TablePrototype from '../../TablePrototype';
// const JSEncrypt = require('jsencrypt');

function Form() {
  const [alert, setAlert] = useState({
    msg: '',
    wronginfo: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [backDropOpen, setBackDropOpen] = useState(false);

  const emailNullMsg = 'email mustn\'t be null';
  const passwordNullMsg = 'password mustn\'t be null';
  const confirmPasswordNullMsg = 'input the password again!';
  const shortPasswordMsg = 'password tooooo short';
  const passwordNeqMsg = 'you inputed different passwords two times';
  const emailAlreadyUsedMsg = 'this e-mail has already been registered! :o';
  const successDialog = (
    <Dialog open={success}>
      <DialogTitle>VERIFY YOUR E-MAIL!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We sent a mail to your E-Mail account. Now verify that in your message
          box!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button href={LOG_IN_URL}>
          CLICK HERE TO LOG-IN AFTER VERIFICATION
        </Button>
      </DialogActions>
    </Dialog>
  );

  async function signup() {
    const axios = require('axios');
    const JSEncrypt = (await import('jsencrypt')).default;
    const encoder = new JSEncrypt();
    encoder.setPublicKey(publicKey);
    var usernameEncoded = usernameEncoded = btoa(username);
    var emailEncoded = btoa(email);
    var pwdEncoded = encoder.encrypt(password);

    var data = {
      name: usernameEncoded,
      email: emailEncoded,
      pwd: pwdEncoded,
    };

    if (email == '') {
      setAlert({
        msg: emailNullMsg,
        wronginfo: true,
      });
    } else if (password == '') {
      setAlert({
        msg: passwordNullMsg,
        wronginfo: true,
      });
    } else if (password.length < 6) {
      setAlert({
        msg: shortPasswordMsg,
        wronginfo: true,
      });
    } else if (confirmPassword == '') {
      setAlert({
        msg: confirmPasswordNullMsg,
        wronginfo: true,
      });
    } else if (confirmPassword != password) {
      setAlert({
        msg: passwordNeqMsg,
        wronginfo: true,
      });
    } else {
      // if ([for some prerequisites])
      setBackDropOpen(true);

      axios
        .post(SIGN_UP_REQ_URL, data)
        .then((response) => {
          setSuccess(true);
          // localStorage.setItem('token', JSON.stringify(response.data));
          setBackDropOpen(false);
        })
        .catch((error) => {
          const response = error.response;
          setBackDropOpen(false);
          if (response.status == 403) {
            setAlert({
              msg: emailAlreadyUsedMsg,
              wronginfo: true,
            });
          }
        });
    }
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const SignupForm = (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant='h5'>BECOME PREMIUM USER OF</Typography>
        </Grid>
        <Grid item xs={3}>
          <ImgenIcon size='100%' />
        </Grid>
      </Grid>

      <TextField
        label='Username'
        variant='outlined'
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <TextField
        label='E-Mail'
        variant='outlined'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <TextField
        label='Password'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              // aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      <TextField
        label='Input Password Again'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {alert.wronginfo ? <Alert severity='error'>{alert.msg}</Alert> : <div />}
      <Button
        variant='contained'
        size='small'
        endIcon={<LoginIcon />}
        onClick={signup}
      >
        SIGN UP!
      </Button>
      {successDialog}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );

  return <TablePrototype component={SignupForm} />;
}

function SignupUI() {
  return <Form />;
}

export default SignupUI;
