'use client'

import { Paper,  Stack, Grid, } from '@mui/material';
import ImgenBar from './ImgenBar';
import styled from 'styled-components';

const FormSheet = styled(Paper)(({ theme }) => ({
    paddingTop: '45px',
    paddingBottom: '45px',
    paddingLeft:  '10%',
    paddingRight: '10%',
    margin: '20px',
    // background: 'rgba(162, 227, 232, 0.6)',
    textAlign: 'center'
}));


function FormSheetPrototype({ component }) {
    return (
        <Grid container spacing={2}>
          <Grid item sm={3} xs={0}></Grid>
          <Grid item sm={6} xs={12}>
            <FormSheet>
              <Stack spacing={4}>
                {component}
              </Stack>
            </FormSheet>
          </Grid>
          <Grid item sm={3} xs={0}></Grid>
        </Grid>

    );
}

function TablePrototype({ component })
{

    return (
        <ImgenBar contents={<FormSheetPrototype component={component} />}/>
    );
}

export default TablePrototype;