'use client'

import ImgenPrototype from '@/app/ImgenPrototype';
import React from 'react';
import ImgenBar from '@/app/ImgenBar';

function Giganta() {
  return (
    <ImgenBar
      contents={
        <ImgenPrototype api='/giganta' sample='/giganta.gif' text='GIGANTA!' />
      }
    />
  );
}

export default Giganta;
