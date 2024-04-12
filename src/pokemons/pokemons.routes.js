const express = require("express");

const {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
} = require(`./pokemons.controller`);

const router = express.Router();

router.get(`/pokemons`, (req, res) => {
    listPokemons(req, res);
});

router.get(`/pokemons/:pokemonId`, (req, res) => {
    getPokemonById(req, res);
});

router.post(`/pokemons`, (req, res) => {
    createPokemon(req, res);
});

router.patch(`/pokemons/:pokemonId`, (req, res) => {
    updatePokemon(req, res);
});

router.delete(`/pokemons/:pokemonId`, (req, res) => {
    deletePokemon(req, res);
});

module.exports = router;
