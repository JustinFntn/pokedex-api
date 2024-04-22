const {
    getPokemonsModel,
    getPokemonModel,
    addPokemonModel,
    updatePokemonModel,
    deletePokemonModel,
} = require(`./pokemons.model`);

const { getTypeModel } = require(`../types/types.model`);

const listPokemons = async (_req, res) => {
    try {
        const pokemons = await getPokemonsModel();
        if (pokemons.length === 0) {
            return res.status(204).send(pokemons);
        }
        return res.status(200).send(pokemons);
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const getPokemonById = async (req, res) => {
    try {
        const pokemon = await getPokemonModel(req.params.pokemonId);
        if (pokemon.length === 0) {
            return res.status(204).send(pokemon);
        }
        return res.status(200).send(pokemon);
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const createPokemon = async (req, res) => {
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
        pokemonsList = await getPokemonsModel();

        // vérification de l'existance du pokemon
        if (pokemonsList.some((pokemon) => pokemon.nom === nom)) {
            return res
                .status(400)
                .end(`Pokemon with name ${nom} already exists`);
        }

        if (pokemonsList.some((pokemon) => pokemon.pokedexId === pokedexId)) {
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
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const updatePokemon = async (req, res) => {
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
        pokemonsList = await getPokemonsModel();

        // vérification de l'existance du pokemon
        if (pokemonsList.find((pokemon) => pokemon.nom === nom)) {
            return res
                .status(400)
                .end(`Pokemon with name ${nom} already exists`);
        }

        if (pokemonsList.find((pokemon) => pokemon.pokedexId === pokedexId)) {
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

        await updatePokemonModel(req);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const deletePokemon = async (req, res) => {
    try {
        const pokemon = await getPokemonModel(req.params.pokemonId);
        if (pokemon.length >= 0) {
            const result = await deletePokemonModel(req.params.pokemonId);
            return res.status(200).end(result);
        } else {
            return res
                .status(400)
                .send(`Pokemon with id ${req.params.pokemonId} does not exist`);
        }
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const validatePokemonEvolution = async (evolutionId, res, evolutionType) => {
    if (evolutionId !== undefined) {
        const pokemon = await getPokemonModel(evolutionId);
        if (pokemon.length === 0) {
            throw new Error(
                `Pokemon with id ${evolutionId} does not exist for ${evolutionType}`
            );
        }
    }
};

const validatePokemonType = async (typeId, res, typeType) => {
    if (typeId !== undefined) {
        const type = await getTypeModel(typeId);
        if (type.length === 0) {
            throw new Error(
                `Type with id ${typeId} does not exist for ${typeType}`
            );
        }
    }
};

module.exports = {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
};
