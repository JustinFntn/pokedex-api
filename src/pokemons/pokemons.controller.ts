import {
    Pokemon,
    getPokemonsModel,
    getPokemonModel,
    addPokemonModel,
    updatePokemonModel,
    deletePokemonModel,
} from "./pokemons.model";

import { Type, getTypeModel } from "../type/types.model";

const listPokemons = async (req: any, res: any) => {
    try {
        const pokemons: Pokemon[] = await getPokemonsModel();
        if (pokemons.length === 0) {
            return res.status(204).end();
        }
        return res.status(200).send(pokemons);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getPokemonById = async (req: any, res: any) => {
    try {
        const pokemon: any = await getPokemonModel(req.params.pokemonId);
        if (pokemon.length === 0) {
            return res.status(204).send();
        }
        return res.status(200).send(pokemon);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const createPokemon = async (req: any, res: any) => {
    try {
        // Variabls pour les verifications
        const {
            nom,
            pokedexId,
            pre_evolution,
            post_evolution,
            type1_id,
            type2_id,
        } = req.body;
        const pokemonsList: Pokemon[] = await getPokemonsModel();

        // vérification de l'existance du pokemon
        if (pokemonsList.some((pokemon: Pokemon) => pokemon.nom === nom)) {
            return res
                .status(400)
                .end(`Pokemon with name ${nom} already exists`);
        }

        if (
            pokemonsList.some(
                (pokemon: Pokemon) => pokemon.pokedexId === pokedexId
            )
        ) {
            return res
                .status(400)
                .end(`Pokemon with pokedexId ${pokedexId} already exists`);
        }

        // vérification de l'existance des évolutions
        await validatePokemonEvolution(pre_evolution, res, "pre evolution");
        await validatePokemonEvolution(post_evolution, res, "post evolution");

        // vérification de l'existance des types
        await validatePokemonType(type1_id, res, "type 1");
        await validatePokemonType(type2_id, res, "type 2");

        // type identique donc on supprime type2_id
        if (type1_id === type2_id) {
            delete req.body.type2_id;
        }

        await addPokemonModel(req.body);
        return res.status(200).send("Pokemon created");
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const updatePokemon = async (req: any, res: any) => {
    try {
        // Variabls pour les verifications
        const {
            nom,
            pokedexId,
            pre_evolution,
            post_evolution,
            type1_id,
            type2_id,
        } = req.body;
        const pokemonsList: Pokemon[] = await getPokemonsModel();

        // vérification de l'existance du pokemon
        if (
            pokemonsList.some((pokemon: Pokemon) => {
                return (
                    pokemon.nom === nom &&
                    pokemon.pokedexId !== Number(req.params.pokemonId)
                );
            })
        ) {
            return res
                .status(400)
                .send(`Pokemon with name ${nom} already exists`);
        }

        if (
            pokemonsList.find(
                (pokemon: Pokemon) => pokemon.pokedexId === pokedexId
            )
        ) {
            return res
                .status(400)
                .send(`Pokemon with pokedexId ${pokedexId} already exists`);
        }

        // vérification de l'existance des évolutions
        await validatePokemonEvolution(pre_evolution, res, "pre evolution");
        await validatePokemonEvolution(post_evolution, res, "post evolution");

        // vérification de l'existance des types
        await validatePokemonType(type1_id, res, "type 1");
        await validatePokemonType(type2_id, res, "type 2");

        // type identique donc on supprime type2_id
        if (type1_id === type2_id) {
            delete req.body.type2_id;
        }

        await updatePokemonModel(req);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deletePokemon = async (req: any, res: any) => {
    try {
        const pokemon: Pokemon | undefined = await getPokemonModel(
            req.params.pokemonId
        );
        if (pokemon) {
            const result: string = await deletePokemonModel(
                req.params.pokemonId
            );
            return res.status(200).end(result);
        } else {
            return res
                .status(400)
                .send(
                    `Pokemon with pokedexId ${req.params.pokemonId} does not exist`
                );
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const validatePokemonEvolution = async (
    evolutionId: number,
    res: any,
    evolutionType: string
) => {
    if (evolutionId !== undefined) {
        const pokemon: Pokemon | undefined = await getPokemonModel(evolutionId);
        if (pokemon === undefined) {
            throw new Error(
                `Pokemon with id ${evolutionId} does not exist for ${evolutionType}`
            );
        }
    }
};

const validatePokemonType = async (
    typeId: number,
    res: any,
    typeType: string
) => {
    if (typeId !== undefined) {
        const type: Type | undefined = await getTypeModel(typeId);
        if (type === undefined) {
            throw new Error(
                `Type with id ${typeId} does not exist for ${typeType}`
            );
        }
    }
};

export {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
};
