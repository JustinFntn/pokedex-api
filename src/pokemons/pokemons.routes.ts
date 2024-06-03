import Express, { Router } from "express";

import {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
} from "./pokemons.controller";

import { verifyJWT } from "../common/jwt.middleware";

const router: Router = Express.Router();

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

export { router };
