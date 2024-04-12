const {
    getPokemonsModel,
    getPokemonModel,
    addPokemonModel,
    updatePokemonModel,
    deletePokemonModel,
} = require(`./pokemons.model`);

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
        await addPokemonModel(req.body);
        return res.status(200).end(req);
    } catch (err) {
        return res.status(500).end();
    }
};

const updatePokemon = async (req, res) => {
    try {
        await updatePokemonModel(req, res);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end();
    }
};

const deletePokemon = async (req, res) => {
    try {
        await deletePokemonModel(req, res);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end();
    }
};

module.exports = {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
};
