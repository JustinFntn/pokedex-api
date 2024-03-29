const express = require("express");
const {
    getPokemonsController,
    getPokemonController,
    addPokemonController,
} = require(`./pokemons.controller`);
const router = express.Router();

router.get(`/pokemons`, (req, res) => {
    getPokemonsController(req, res);
});

router.get(`/pokemons/:pokemonId`, (req, res) => {
    getPokemonController(req, res);
});

router.post(`/pokemons`, (req, res) => {
    console.log(req);
    addPokemonController(req, res);
});

module.exports = router;
