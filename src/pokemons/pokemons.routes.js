const express = require("express");

const {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
} = require(`./pokemons.controller`);

const { verifyJWT } = require(`../common/jwt.middleware`);

const router = express.Router();

/**
 * @openapi
 * /pokemons:
 *  get:
 *    tag:
 *     - pokemons
 *      description: Get all pokemons
 *      responses:
 *          200:
 *              description: Success
 *          500:
 *              description: Internal Server Error
 */
router.get(`/pokemons`, (req, res) => {
    listPokemons(req, res);
});

router.get(`/pokemons/:pokemonId`, (req, res) => {
    getPokemonById(req, res);
});

router.post(`/pokemons`, verifyJWT, (req, res) => {
    createPokemon(req, res);
});

router.patch(`/pokemons/:pokemonId`, verifyJWT, (req, res) => {
    updatePokemon(req, res);
});

router.delete(`/pokemons/:pokemonId`, verifyJWT, (req, res) => {
    deletePokemon(req, res);
});

module.exports = router;
