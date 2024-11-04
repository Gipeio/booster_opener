import React from 'react';
import './booster.css';

function Booster({ openBooster }) {
  return (
    <div id="booster" onClick={openBooster}></div>
  );
}

export default Booster;
