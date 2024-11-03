import React, { useState, useEffect } from 'react';
import './App.css';
import Booster from './components/booster/booster';
import Card from './components/card/card';

function App() {
  const [cards, setCards] = useState([]);
  const [isBoosterOpen, setIsBoosterOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // État pour la carte sélectionnée

  // Fonction pour ouvrir le booster et récupérer les cartes via l'API
  async function openBooster() {
    setIsBoosterOpen(true);
    let cardsWithImages = [];
    
    while (cardsWithImages.length < 6) {
      const response = await fetch('https://api.magicthegathering.io/v1/cards?random=true&pageSize=24');
      const data = await response.json();
      const filteredCards = data.cards.filter(card => card.imageUrl);
      cardsWithImages = [...cardsWithImages, ...filteredCards].slice(0, 6);
    }
  
    setCards(cardsWithImages);
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

  // Fonction pour ouvrir la modal de la carte sélectionnée
  function openCardModal(card) {
    setSelectedCard(card);
  }

  // Fonction pour fermer la modal
  function closeCardModal() {
    setSelectedCard(null);
  }

  return (
    <div className="App">
      {!isBoosterOpen ? (
        <Booster openBooster={openBooster} />
      ) : (
        <>
          <div id="cards-container">
            {cards.map((card, index) => (
              <Card key={index} card={card} onClick={() => openCardModal(card)} />
            ))}
          </div>
          <button onClick={resetBooster} className="reset-button">Retour au tirage de booster</button>
        </>
      )}

      {selectedCard && (
        <div className="modal" onClick={closeCardModal}>
          <div className="modal-content">
            <img src={selectedCard.imageUrl} alt={selectedCard.name} className="modal-image" />
          </div>
        </div>

      )}
    </div>
  );
}

export default App;
