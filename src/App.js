import React, { useState, useEffect } from 'react';
import './App.css';
import Booster from './components/booster/booster';
import Card from './components/card/card';

function App() {
  const [cards, setCards] = useState([]);
  const [isBoosterOpen, setIsBoosterOpen] = useState(false);

  // Fonction pour ouvrir le booster et récupérer les cartes via l'API
  async function openBooster() {
    setIsBoosterOpen(true);
    const response = await fetch('https://api.magicthegathering.io/v1/cards?random=true&pageSize=6');
    const data = await response.json();
    setCards(data.cards);
  }

  // Fonction pour réinitialiser l'état et revenir à la page de tirage de booster
  function resetBooster() {
    setIsBoosterOpen(false);
    setCards([]);
  }

  // Effet pour animer les cartes en cascade
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
        <Booster openBooster={openBooster} />
      ) : (
        <div id="cards-container">
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
          <button onClick={resetBooster} className="reset-button">Retour au tirage de booster</button>
        </div>
      )}
    </div>
  );
}

export default App;
