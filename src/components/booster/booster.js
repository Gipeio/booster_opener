import React from 'react';
import './booster.css';

function Booster({ openBooster }) {
  return (
    <div id="booster" onClick={openBooster}>
      Booster Pack
    </div>
  );
}

export default Booster;
