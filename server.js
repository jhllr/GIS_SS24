const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Verbindung zu MongoDB
const username = encodeURIComponent('julianhaller3'); // Ersetze durch deinen Benutzernamen
const password = encodeURIComponent('GisProjekt2024!'); // Ersetze durch dein Passwort
const dbUri = `mongodb+srv://${username}:${password}@gis.u7zuv9x.mongodb.net/?retryWrites=true&w=majority&appName=gis`;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Verbunden mit MongoDB');
}).catch(err => {
  console.error('MongoDB-Verbindungsfehler:', err);
});

// Schema und Modell erstellen 
const pokemonSchema = new mongoose.Schema({
  name: String,
  pokedexNumber: Number,
  type: String,
  height: String,
  weight: String,
  category: String,
  abilities: [String],
  genderDistribution: String,
  evolutionStages: [String],
  weaknesses: [String],
  resistances: [String],
  description: String,
  imageUrl: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Startseite
app.get('/', (req, res) => {
  res.send('Pokédex API');
});

// Alle Pokémon abfragen 
app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Pokémon hinzufügen
app.post('/pokemons', async (req, res) => {
  const pokemon = new Pokemon(req.body);
  try {
    const savedPokemon = await pokemon.save();
    res.json(savedPokemon);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Pokémon löschen
app.delete('/pokemons/:id', async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndRemove(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).send('Pokémon nicht gefunden');
    }
    res.json(deletedPokemon);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

