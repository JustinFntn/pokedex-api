//const express = require("express");

const {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
} = require(`./pokemons.controller`);

const { verifyJWT } = require(`../common/jwt.middleware`);

const router = express.Router();

router.get(`/pokemons`, (req:Request, res: Response) => {
    listPokemons(req, res);
});

router.get(`/pokemons/:pokemonId`, (req:Request, res: Response) => {
    getPokemonById(req, res);
});

router.post(`/pokemons`, verifyJWT, (req:Request, res: Response) => {
    createPokemon(req, res);
});

router.patch(`/pokemons/:pokemonId`, verifyJWT, (req:Request, res: Response) => {
    updatePokemon(req, res);
});

router.delete(`/pokemons/:pokemonId`, verifyJWT, (req:Request, res: Response) => {
    deletePokemon(req, res);
});

module.exports = router;
