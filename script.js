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

    // Event Listeners für Buttons in pokedex.html
    const addButton = document.getElementById('add-image-button');
    const changeButton = document.getElementById('change-image-button');
    const deleteButton = document.getElementById('delete-image-button');
    const nextPageButton = document.getElementById('next-page-button');
    const editTextButton = document.getElementById('edit-text-button');

    if (addButton && changeButton && deleteButton && nextPageButton && editTextButton) {
        addButton.addEventListener('click', addImage);
        changeButton.addEventListener('click', changeImage);
        deleteButton.addEventListener('click', deleteImage);
        editTextButton.addEventListener('click', editText);
        loadImageFromLocalStorage(); // Bild aus dem Local Storage laden
        loadTextFromLocalStorage(); // Text aus dem Local Storage laden
    }

    // DOM Manipulation für index.html
    if (document.querySelector('title').textContent.includes('Dein Pokedex')) {
        const topBar = document.createElement('div');
        topBar.classList.add('top-bar');

        const backgroundBanner = document.createElement('div');
        backgroundBanner.classList.add('background-banner');

        const pokeballBackground = document.createElement('div');
        pokeballBackground.classList.add('pokeball-background');

        const mainButtons = document.createElement('div');
        mainButtons.innerHTML = `
            <a href="pokedex.html" id="to-pokedex" class="button">Zum Pokédex</a>
            <a href="freunde.html" class="button button-top button-friends">Freunde</a>
            <a href="rangliste.html" class="button button-top button-rangliste">Rangliste</a>
            <a href="kontakt.html" class="button button-top button-anmelden">Anmelden</a>
        `;

        document.body.appendChild(topBar);
        document.body.appendChild(backgroundBanner);
        document.body.appendChild(pokeballBackground);
        document.body.appendChild(mainButtons);
    }
});
