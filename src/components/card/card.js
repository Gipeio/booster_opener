import React from 'react';
import './card.css';

function Card({ card, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        <img src={card.imageUrl} alt={card.name} />
      </div>
    </div>
  );
}

export default Card;
