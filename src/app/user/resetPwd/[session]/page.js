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
  CircularProgress
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ImgenIcon from '@/app/ImgenIcon';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import JSEncrypt from 'jsencrypt';
import { LOG_IN_URL, RESETPWD_REQ_URL, publicKey } from '@/app/Utils';
import TablePrototype from '@/app/TablePrototype';

function ResetPwd({ params }) {
  const [alert, setAlert] = useState({
    msg: '',
    wronginfo: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [backDropOpen, setBackDropOpen] = useState(false);

  const session = params.session;
  const passwordNullMsg = 'password mustn\'t be null';
  const confirmPasswordNullMsg = 'input the password again!';
  const shortPasswordMsg = 'password tooooo short';
  const passwordNeqMsg = 'you inputted different passwords two times';
  const sessionInvalidMsg = 'the session has expired! request again to reset your password!';
  const networkErrorMsg = 'network error!';
  const successDialog = (
    <Dialog open={success}>
      <DialogTitle>RESET SUCCESSFUL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Password reset successfully done!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button href={LOG_IN_URL}>CLICK HERE TO LOG-IN</Button>
      </DialogActions>
    </Dialog>
  );

  function reset() {
    const axios = require('axios');

    if (password == '') {
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
      setBackDropOpen(true);
      var encoder = new JSEncrypt();
      encoder.setPublicKey(publicKey);
      var pwdEncoded = encoder.encrypt(password);
    //   console.log(pwdEncoded);

      axios.post(RESETPWD_REQ_URL, {
            session: session,
            pwd: pwdEncoded
        })
        .then((response) => {
          setSuccess(true);
          // localStorage.setItem('token', JSON.stringify(response.data));
          setBackDropOpen(false);
        })
        .catch((error) => {
          const response = error.response;
          setBackDropOpen(false);
          if (response == null) {
            setAlert({
                msg: networkErrorMsg,
                wronginfo: true
            });
          }
          if (response.status == 403) {
            setAlert({
              msg: sessionInvalidMsg,
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
          <Typography variant='h5'>RESET YOUR PASSWORD NOW</Typography>
        </Grid>
        <Grid item xs={3}>
          <ImgenIcon size='100%' />
        </Grid>
      </Grid>

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
        onClick={reset}
      >
        RESET
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

export default ResetPwd;
