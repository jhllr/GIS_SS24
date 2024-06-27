const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');

// Alle Pokémon abfragen
router.get('/', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Neues Pokémon hinzufügen
router.post('/', async (req, res) => {
  const newPokemon = new Pokemon(req.body);
  try {
    const savedPokemon = await newPokemon.save();
    res.json(savedPokemon);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Pokémon aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPokemon);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Pokémon löschen
router.delete('/:id', async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndRemove(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).send('Pokemon not found');
    }
    res.json(deletedPokemon);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
