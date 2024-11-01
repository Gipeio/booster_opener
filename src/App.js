import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [isBoosterOpen, setIsBoosterOpen] = useState(false);

  // Fonction pour ouvrir le booster et récupérer les cartes
  async function openBooster() {
    setIsBoosterOpen(true);
    const response = await fetch('https://api.magicthegathering.io/v1/cards?random=true&pageSize=6');
    const data = await response.json();
    setCards(data.cards);
  }

  // Fonction pour revenir à la page de tirage de booster
  function resetBooster() {
    setIsBoosterOpen(false);
    setCards([]);
  }

  // Animation en cascade pour les cartes
  useEffect(() => {
    if (cards.length) {
      cards.forEach((_, index) => {
        setTimeout(() => {
          document.getElementsByClassName("card")[index].style.opacity = 1;
        }, index * 300);
      });
    }
  }, [cards]);

  return (
    <div className="App">
      {!isBoosterOpen ? (
        <div id="booster" onClick={openBooster}>Booster Pack</div>
      ) : (
        <div id="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-image">
                <img src={card.imageUrl} alt={card.name} />
              </div>
              <div className="card-details">
                <h3>{card.name}</h3>
                <p>{card.text || "No description available."}</p>
                <p><strong>Artist:</strong> {card.artist}</p>
              </div>
            </div>
          ))}
          {/* Bouton de retour */}
          <button onClick={resetBooster} className="reset-button">Retour au tirage de booster</button>
        </div>
      )}
    </div>
  );
}

export default App;
