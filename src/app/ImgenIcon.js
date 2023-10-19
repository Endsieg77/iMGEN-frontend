import { Box } from '@mui/material';
import styled from 'styled-components';

function ImgenIcon({ size })
{
    const style = {
        height: size,
        width: size,
        objectFit: 'contain'
    };

    return (
        <Box component='img' src='/imgen.png' style={style} />
    );
}

export default ImgenIcon;