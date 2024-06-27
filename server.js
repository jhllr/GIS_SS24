const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Verzeichnis für statische Dateien (CSS, JS, Bilder usw.)
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json()); // JSON-Parsing für Anfragen

// API-Endpunkt zum Abrufen der Pokémon-Daten
app.get('/api/pokemons', (req, res) => {
  fs.readFile(path.join(__dirname, 'backend', 'pokemons.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Fehler beim Laden der Pokémon-Daten');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// API-Endpunkt zum Hinzufügen eines neuen Pokémon
app.post('/api/pokemons', (req, res) => {
  fs.readFile(path.join(__dirname, 'backend', 'pokemons.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Fehler beim Laden der Pokémon-Daten');
    } else {
      const pokemons = JSON.parse(data);
      const newPokemon = req.body;
      pokemons.push(newPokemon);
      fs.writeFile(path.join(__dirname, 'backend', 'pokemons.json'), JSON.stringify(pokemons, null, 2), err => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Speichern der Pokémon-Daten');
        } else {
          res.status(201).json(newPokemon);
        }
      });
    }
  });
});

// API-Endpunkt zum Aktualisieren eines Pokémon
app.put('/api/pokemons/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'backend', 'pokemons.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Fehler beim Laden der Pokémon-Daten');
    } else {
      let pokemons = JSON.parse(data);
      const pokemonId = parseInt(req.params.id);
      const updatedPokemon = req.body;
      pokemons = pokemons.map(pokemon => pokemon.pokedexNumber === pokemonId ? updatedPokemon : pokemon);
      fs.writeFile(path.join(__dirname, 'backend', 'pokemons.json'), JSON.stringify(pokemons, null, 2), err => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Speichern der Pokémon-Daten');
        } else {
          res.json(updatedPokemon);
        }
      });
    }
  });
});

// API-Endpunkt zum Löschen eines Pokémon
app.delete('/api/pokemons/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'backend', 'pokemons.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Fehler beim Laden der Pokémon-Daten');
    } else {
      let pokemons = JSON.parse(data);
      const pokemonId = parseInt(req.params.id);
      pokemons = pokemons.filter(pokemon => pokemon.pokedexNumber !== pokemonId);
      fs.writeFile(path.join(__dirname, 'backend', 'pokemons.json'), JSON.stringify(pokemons, null, 2), err => {
        if (err) {
          console.error(err);
          res.status(500).send('Fehler beim Speichern der Pokémon-Daten');
        } else {
          res.status(204).send();
        }
      });
    }
  });
});

// Alle anderen Anfragen auf index.html umleiten (für Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'homepage.html'));
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
