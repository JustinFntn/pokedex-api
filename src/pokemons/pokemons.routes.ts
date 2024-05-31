import Express from "express";

const {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
} = require(`./pokemons.controller`);

const { verifyJWT } = require(`../common/jwt.middleware`);

const router = Express.Router();

router.get(`/pokemons`, (req: any, res: any) => {
    listPokemons(req, res);
});

router.get(`/pokemons/:pokemonId`, (req: any, res: any) => {
    getPokemonById(req, res);
});

router.post(`/pokemons`, verifyJWT, (req: any, res: any) => {
    createPokemon(req, res);
});

router.patch(`/pokemons/:pokemonId`, verifyJWT, (req: any, res: any) => {
    updatePokemon(req, res);
});

router.delete(`/pokemons/:pokemonId`, verifyJWT, (req: any, res: any) => {
    deletePokemon(req, res);
});

module.exports = router;
