const { getPokemonsModel, getPokemonModel } = require(`./pokemons.model`);

const getPokemonsController = async (_req, res) => {
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

const getPokemonController = async (req, res) => {
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

const addPokemonController = async (req, res) => {
    try{
        await addPokemonController(req.body);
        
    }
};

module.exports = {
    getPokemonsController,
    getPokemonController,
    addPokemonController,
};
