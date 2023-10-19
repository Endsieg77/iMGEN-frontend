'use client'

import ImgenPrototype from '@/app/ImgenPrototype';
import React from 'react';
import ImgenBar from '@/app/ImgenBar';

function Marry() {
  return (
    <ImgenBar
      contents={
        <ImgenPrototype api='/marry' sample='/marry.png' text='MARRY ME!' />
      }
    />
  );
}

export default Marry;
