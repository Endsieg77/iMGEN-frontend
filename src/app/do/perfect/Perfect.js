'use client'

import ImgenPrototype from '@/app/ImgenPrototype';
import React from 'react';
import ImgenBar from '@/app/ImgenBar';

function Perfect() {
  return (
    <ImgenBar
      contents={
        <ImgenPrototype api='/perfect' sample='/perfect.png' text='PERFECT!' />
      }
    />
  );
}

export default Perfect;
