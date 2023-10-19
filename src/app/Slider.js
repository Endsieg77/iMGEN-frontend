import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { LAST5_URL, ACQUIRE_URL, DISPLAY_URL } from './Utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SliderSwitch() {
    var images = useRef([{label: 'Guten Tag!', path: './imgen.png'}]);

    useEffect(() => {
        const axios = require('axios');
        axios.get(LAST5_URL)
          .then(response => {
              images.current = response.data;
              console.log(response);
          })
          .catch(error => console.log(error));
    }, []);

    return <Slider images={images.current} />;
}

function Slider({ images }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: '#0b005e',
        }}
      >
        <Typography
          color='#ffffff'
          fontFamily='Cascadia Mono MF'
        >
          {`${images[activeStep].label} by: ${images[activeStep].illustrator}`}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <a href={step.path.replace(ACQUIRE_URL, DISPLAY_URL)}>
                <Box
                  component='img'
                  sx={{
                    height: 255,
                    display: 'block',
                    objectFit: 'contain',
                    overflow: 'hidden',
                    width: '100%',
                    background: 'rgba(19, 6, 199, 0.1)'
                  }}
                  src={step.path}
                  alt={step.label}
                />
              </a>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        sx={{
          bgcolor: '#def4fc',
          borderRadius: '0 0 4px 4px'
        }}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SliderSwitch;