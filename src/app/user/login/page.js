"use client";

import {
  Button,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ImgenIcon from "../../ImgenIcon";
import { useState } from "react";
// import { Navigate, Route, BrowserRouter as Router } from 'react-router-dom';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  LOG_IN_REQ_URL,
  SIGN_UP_URL,
  FORGOT_URL,
  CLIENT_URL,
  publicKey,
} from "../../Utils";
import TablePrototype from "../../TablePrototype";
import { useRouter } from "next/navigation";

// const JSEncrypt = require('jsencrypt');

function Form() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backDropOpen, setBackDropOpen] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    wronginfo: false,
  });

  const emailNullMsg = "email mustn't be null";
  const passwordNullMsg = "password mustn't be null";
  const shortPasswordMsg = "password tooooo short";
  const wrongPasswordMsg = "check your e-mail or password! :o";
  const networkErrotMsg = "network error!";

  async function login() {
    setBackDropOpen(true);

    if (email == "") {
      setAlert({
        msg: emailNullMsg,
        wronginfo: true,
      });
    } else if (password == "") {
      setAlert({
        msg: passwordNullMsg,
        wronginfo: true,
      });
    } else if (password.length < 6) {
      setAlert({
        msg: shortPasswordMsg,
        wronginfo: true,
      });
    } else {
      const axios = require("axios");
      const JSEncrypt = (await import("jsencrypt")).default;
      const encoder = new JSEncrypt();
      encoder.setPublicKey(publicKey);
      const emailEncoded = btoa(email);
      const pwdEncoded = encoder.encrypt(password);
      // console.log(emailEncoded);
      // console.log(pwdEncoded);

      var data = {
        email: emailEncoded,
        pwd: pwdEncoded,
      };

      axios
        .get(LOG_IN_REQ_URL, { params: data })
        .then((response) => {
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("loginfo", JSON.stringify(response.data));
          }
          setBackDropOpen(false);
          router.push(CLIENT_URL);
        })
        .catch((error) => {
          const response = error.response;
          setBackDropOpen(false);
          if (response == null) {
            setAlert({
              msg: networkErrotMsg,
              wronginfo: true,
            });
            return;
          }
          if (response.status == 403) {
            setAlert({
              msg: wrongPasswordMsg,
              wronginfo: true,
            });
          }
        });
    }
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  const LoginForm = (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h5">LOG YOURSELF IN</Typography>
        </Grid>
        <Grid item xs={3}>
          <ImgenIcon size="100%" />
        </Grid>
      </Grid>

      <TextField
        label="E-Mail _[:)_]\_"
        variant="outlined"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <TextField
        label="Password \(`3`)=*"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              // aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {alert.wronginfo ? <Alert severity="error">{alert.msg}</Alert> : <div />}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button variant="text" size="small" href={SIGN_UP_URL}>
            {"Does'nt have an account? register one >,+"}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="text" size="small" href={FORGOT_URL}>
            FORGOT PASSWORD
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Button
            variant="contained"
            size="big"
            endIcon={<LoginIcon />}
            onClick={login}
          >
            iMGEN, KIDO!
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );

  return <TablePrototype component={LoginForm} />;
}

function LoginUI() {
  return <Form />;
}

// function HandleRedirect() {
//   return (
//     <Router>
//       {localStorage.getItem('loginStatus') == 'OK' ? (
//         <Navigate to='/' />
//       ) : (
//         <LoginUI />
//       )}
//     </Router>
//   );
// }

// export default HandleRedirect;
export default LoginUI;
