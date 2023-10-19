'use client'

import ImgenPrototype from '@/app/ImgenPrototype';
import React from 'react';
import ImgenBar from '@/app/ImgenBar';

function Brain() {
  return (
    <ImgenBar
      contents={
        <ImgenPrototype api='/brain' sample='/brain.gif' text='BRAIN UPGRADE!' />
      }
    />
  );
}

export default Brain;
