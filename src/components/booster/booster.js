import React from 'react';
import './booster.css';

function Booster({ openBooster }) {
  return (
    <div className="parallax-container">
      <div className="background-layer layer1"></div> 
      <div className="background-layer layer2"></div> 
      <div id="booster" onClick={openBooster}></div> 
    </div>
  );
}

export default Booster;
