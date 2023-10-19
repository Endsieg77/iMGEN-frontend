'use client'

import TablePrototype from '@/app/TablePrototype';
import { useState } from 'react';
import {
  TextField,
  Typography,
  Chip,
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { LOG_IN_URL, FORGOT_REQ_URL } from '@/app/Utils';

function Forgot() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [backDropOpen, setBackDropOpen] = useState(false);

  function handleSendMail() {
    const axios = require('axios');
    var emailEncoded = btoa(email);
    setBackDropOpen(true);

    axios
      .post(`${FORGOT_REQ_URL}?email=${emailEncoded}`)
      .then((response) => {
        setBackDropOpen(false);
        setSuccess(true);
      })
      .catch((error) => {
        setBackDropOpen(false);
        console.log(error);
      });
  }

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

  const components = (
    <>
      <Typography variant='h5'>RESET YOUR PASSWORD</Typography>
      <Chip
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }}
        label='We will send a message to your E-Mail account if you had registered with this E-Mail before.'
      />
      <TextField
        label='Input your E-Mail'
        variant='outlined'
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <Button variant='contained' onClick={handleSendMail}>
        SEND MAIL
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

  return <TablePrototype component={components}></TablePrototype>;
}

export default Forgot;
