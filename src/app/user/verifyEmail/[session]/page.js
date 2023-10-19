'use client'

import ImgenBar from '@/app/ImgenBar';
import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { VERIFYEMAIL_REQ_URL, CLIENT_URL } from '@/app/Utils';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const styles = {
    background: {
        // backgroundImage: `url(./background.png)`,
        background: 'rgba(162, 227, 232, 0.5)',
        padding: '12%',
        textAlign: 'center',
        borderRadius: '2%',
    },
};

function VerifyEmail({ params })
{
    var session = params.session;
    const [text, setText] = useState('Waiting...');
    const [icon, setIcon] = useState(<HourglassTopIcon />);

    useEffect(() => {
        const axios = require('axios');
        axios.post(
            `${VERIFYEMAIL_REQ_URL}?session=${session}`,
            )
            .then((response) => {
                setText('Successfully signed up!');
                setIcon(<DoneOutlineIcon />);
            })
            .catch((error) => {
                setText('Something went wrong! Maybe you should sign up again or check the URL!');
                setIcon(<SentimentVeryDissatisfiedIcon />);
            });
    }, []);

    var contents =
        <Box style={styles.background}>
            {icon}
            <Typography variant='h3' textAlign='center'>{text}</Typography>
            <Button href={CLIENT_URL} size='large'>TO HOME PAGE</Button>
        </Box>

    return <ImgenBar contents={contents}></ImgenBar>
}

export default VerifyEmail;