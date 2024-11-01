import React from 'react';
import './card.css';

function Card({ card }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={card.imageUrl} alt={card.name} />
      </div>
      <div className="card-details">
        <h3>{card.name}</h3>
        <p>{card.text || "No description available."}</p>
        <p><strong>Artist:</strong> {card.artist}</p>
      </div>
    </div>
  );
}

export default Card;
