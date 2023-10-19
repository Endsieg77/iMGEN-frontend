'use client'

import ImgenPrototype from '@/app/ImgenPrototype';
import React from 'react';
import ImgenBar from '@/app/ImgenBar';

function Petpet() {
  return (
    <ImgenBar
      contents={
        <ImgenPrototype api='/petpet' sample='/petpet-hand.gif' text='PETPET!' />
      }
    />
  );
}

export default Petpet;
