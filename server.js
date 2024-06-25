document.addEventListener('DOMContentLoaded', () => {
    const pageIdentifier = window.location.pathname.split('/').pop().split('.').shift(); // Identifiziert die aktuelle Seite
  
    const addImage = () => {
      var imageUrl = prompt("Geben Sie die URL des neuen Bildes ein:"); // Fragt nach der URL des neuen Bildes
      if (imageUrl) {
        document.getElementById('pokemon-image').src = imageUrl; // Setzt das neue Bild
        saveImageToLocalStorage(imageUrl); // Speichert das Bild in localStorage
      }
    };
  
    const changeImage = () => {
      var imageUrl = prompt("Geben Sie die neue URL des Bildes ein:"); // Fragt nach der URL des neuen Bildes
      if (imageUrl) {
        document.getElementById('pokemon-image').src = imageUrl; // Setzt das neue Bild
        saveImageToLocalStorage(imageUrl); // Speichert das Bild in localStorage
      }
    };
  
    const deleteImage = () => {
      document.getElementById('pokemon-image').src = ''; // Löscht das Bild
      removeImageFromLocalStorage(); // Entfernt das Bild aus localStorage
    };
  
    const saveImageToLocalStorage = (url) => {
      localStorage.setItem(`${pageIdentifier}-pokemonImage`, url); // Speichert das Bild in localStorage
    };
  
    const loadImageFromLocalStorage = () => {
      const imageUrl = localStorage.getItem(`${pageIdentifier}-pokemonImage`); // Lädt das Bild aus localStorage
      if (imageUrl) {
        document.getElementById('pokemon-image').src = imageUrl; // Setzt das Bild
      }
    };
  
    const removeImageFromLocalStorage = () => {
      localStorage.removeItem(`${pageIdentifier}-pokemonImage`); // Entfernt das Bild aus localStorage
    };
  
    const editText = () => {
      var newText = prompt("Bearbeiten Sie den Text:", document.getElementById('pokemon-details').innerHTML); // Fragt nach dem neuen Text
      if (newText) {
        document.getElementById('pokemon-details').innerHTML = newText; // Setzt den neuen Text
        saveTextToLocalStorage(newText); // Speichert den Text in localStorage
      }
    };
  
    const saveTextToLocalStorage = (text) => {
      localStorage.setItem(`${pageIdentifier}-pokemonText`, text); // Speichert den Text in localStorage
    };
  
    const loadTextFromLocalStorage = () => {
      const text = localStorage.getItem(`${pageIdentifier}-pokemonText`); // Lädt den Text aus localStorage
      if (text) {
        document.getElementById('pokemon-details').innerHTML = text; // Setzt den Text
      }
    };
  
    const addButton = document.getElementById('add-image-button');
    const changeButton = document.getElementById('change-image-button');
    const deleteButton = document.getElementById('delete-image-button');
    const nextPageButton = document.getElementById('next-page-button');
    const editTextButton = document.getElementById('edit-text-button');
  
    if (addButton && changeButton && deleteButton && nextPageButton && editTextButton) {
      addButton.addEventListener('click', addImage); // Fügt den Event Listener für das Hinzufügen eines Bildes hinzu
      changeButton.addEventListener('click', changeImage); // Fügt den Event Listener für das Ändern eines Bildes hinzu
      deleteButton.addEventListener('click', deleteImage); // Fügt den Event Listener für das Löschen eines Bildes hinzu
      editTextButton.addEventListener('click', editText); // Fügt den Event Listener für das Bearbeiten des Textes hinzu
      loadImageFromLocalStorage(); // Lädt das Bild aus localStorage
      loadTextFromLocalStorage(); // Lädt den Text aus localStorage
    }
  
    // Funktionen zum Interagieren mit der API
    const addPokemon = async (pokemon) => {
      const response = await fetch('http://localhost:3000/pokemons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon)
      });
      return response.json();
    };
  
    const getPokemons = async () => {
      const response = await fetch('http://localhost:3000/pokemons');
      return response.json();
    };
  
    // Beispiel-Pokémon hinzufügen
    const newPokemon = {
      name: 'Pikachu',
      pokedexNumber: 25,
      type: 'Elektro',
      height: '0,4 m',
      weight: '6,0 kg',
      category: 'Maus-Pokémon',
      abilities: ['Statik', 'Blitzfänger'],
      genderDistribution: '50% männlich, 50% weiblich',
      evolutionStages: ['Pichu', 'Pikachu', 'Raichu'],
      weaknesses: ['Boden'],
      resistances: ['Flug', 'Stahl', 'Elektro'],
      description: 'Pikachu ist eines der bekanntesten und beliebtesten Pokémon weltweit...',
      imageUrl: 'URL_ZUM_BILD'
    };
  
    // addPokemon(newPokemon).then(pokemon => console.log('Pokémon hinzugefügt:', pokemon));
  
    getPokemons().then(pokemons => console.log('Alle Pokémon:', pokemons));
  });
  
