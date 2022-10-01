import React from 'react';
import Script from 'next/script';
import process from 'process';

export default function TimerApp() {
  return (
    <>
   {{if (process.browser &&
      <div>its alive!</div>)
    }}
    </>
  );
}
