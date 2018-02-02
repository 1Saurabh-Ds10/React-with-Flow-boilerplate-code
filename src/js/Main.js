import React from 'react';

import big from '../img/15.jpg';
import '../css/style.css';

const Main = () => {
  return (
    <div className='my-app'>
      <h1> Hello World</h1>
      <h1> HMR</h1>
      <img src={big} alt='big' />
    </div>
  );
};

export default Main;
