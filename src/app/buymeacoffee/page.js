'use client'

import { Grid, Typography } from '@mui/material';
import ImgenBar from '../ImgenBar';
import styled from 'styled-components';
import { Sos } from '@mui/icons-material';

const ImgZone = styled('img')({
  height: '30vh',
  // width: '50%',
  objectFit: 'contain',
  top: '50%',
  left: '50%',
});

export default function BuyMe1Coffee() {
  const contents = (
    <Grid
      container
      spacing={4}
      alignItems='center'
      sx={{ background: 'rgba(162, 227, 232, 0.2)', marginTop: '5px' }}
    >
      <Grid item xs={3} align='center'>
        <ImgZone src='ashes2ashes.gif' />
      </Grid>
      <Grid item xs={6} align='center'>
        <Sos />
        <Typography variant='h3' textAlign='center' color='#04193d'>
          SPONSOR MEEEEE
        </Typography>
      </Grid>
      <Grid item xs={3} align='center'>
        <ImgZone src='ashes2ashes.gif' />
      </Grid>

      <Grid item xs={3} align='center'>
        <ImgZone src='begging4rice.gif' />
      </Grid>
      <Grid item xs={6} align='center'>
        <ImgZone src='alipay.jpg' />
      </Grid>
      <Grid item xs={3} align='center'>
        <ImgZone src='begging4rice.gif' />
      </Grid>

      <Grid item xs={4} align='center'>
        <ImgZone src='capoo.gif' />
      </Grid>
      <Grid item xs={4} align='center'>
        <ImgZone src='sakaban.gif' />
      </Grid>
      <Grid item xs={4} align='center'>
        <ImgZone src='capoo.gif' />
      </Grid>
    </Grid>
  );
  return <ImgenBar contents={contents} />;
}
