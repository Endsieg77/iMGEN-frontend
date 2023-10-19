'use client'

import ImgenPrototype from '@/app/ImgenPrototype';
import React from 'react';
import ImgenBar from '@/app/ImgenBar';

function DRVV() {
  return (
    <ImgenBar
      contents={
        <ImgenPrototype api='/drvv' sample='/drvv.gif' text="DR. VV'S REVENGE!" premium={true} />
      }
    />
  );
}

export default DRVV;
