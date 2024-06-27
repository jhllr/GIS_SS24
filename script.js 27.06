document.addEventListener('DOMContentLoaded', () => {
    const pageIdentifier = window.location.pathname.split('/').pop().split('.').shift();

    const addImage = () => {
        var imageUrl = prompt("Geben Sie die URL des neuen Bildes ein:");
        if (imageUrl) {
            document.getElementById('pokemon-image').src = imageUrl;
            saveImageToLocalStorage(imageUrl);
        }
    };

    const changeImage = () => {
        var imageUrl = prompt("Geben Sie die neue URL des Bildes ein:");
        if (imageUrl) {
            document.getElementById('pokemon-image').src = imageUrl;
            saveImageToLocalStorage(imageUrl);
        }
    };

    const deleteImage = () => {
        document.getElementById('pokemon-image').src = '';
        removeImageFromLocalStorage();
    };

    const saveImageToLocalStorage = (url) => {
        localStorage.setItem(`${pageIdentifier}-pokemonImage`, url);
    };

    const loadImageFromLocalStorage = () => {
        const imageUrl = localStorage.getItem(`${pageIdentifier}-pokemonImage`);
        if (imageUrl) {
            document.getElementById('pokemon-image').src = imageUrl;
        }
    };

    const removeImageFromLocalStorage = () => {
        localStorage.removeItem(`${pageIdentifier}-pokemonImage`);
    };

    const editText = () => {
        var newText = prompt("Bearbeiten Sie den Text:", document.getElementById('pokemon-details').innerHTML);
        if (newText) {
            document.getElementById('pokemon-details').innerHTML = newText;
            saveTextToLocalStorage(newText);
        }
    };

    const saveTextToLocalStorage = (text) => {
        localStorage.setItem(`${pageIdentifier}-pokemonText`, text);
    };

    const loadTextFromLocalStorage = () => {
        const text = localStorage.getItem(`${pageIdentifier}-pokemonText`);
        if (text) {
            document.getElementById('pokemon-details').innerHTML = text;
        }
    };

    const addButton = document.getElementById('add-image-button');
    const changeButton = document.getElementById('change-image-button');
    const deleteButton = document.getElementById('delete-image-button');
    const editTextButton = document.getElementById('edit-text-button');

    if (addButton && changeButton && deleteButton && editTextButton) {
        addButton.addEventListener('click', addImage);
        changeButton.addEventListener('click', changeImage);
        deleteButton.addEventListener('click', deleteImage);
        editTextButton.addEventListener('click', editText);
        loadImageFromLocalStorage();
        loadTextFromLocalStorage();
    }

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

    getPokemons().then(pokemons => console.log('Alle Pokémon:', pokemons));
});
