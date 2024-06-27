const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: String,
  number: Number,
  type: String,
  height: String,
  weight: String,
  category: String,
  abilities: [String],
  genderRatio: String,
  evolutions: [String],
  weaknesses: [String],
  resistances: [String],
  description: String,
  imageUrl: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
