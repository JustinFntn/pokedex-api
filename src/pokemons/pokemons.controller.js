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
        pokemonsList = await getPokemonsModel();
        const { nom, pokedexId } = req.body;
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
        const { pre_evolution, post_evolution } = req.body;
        if (pre_evolution) {
            const prePokemon = await getPokemonModel(pre_evolution);
            if (prePokemon.length === 0) {
                return res
                    .status(400)
                    .send(
                        `Pokemon with id ${pre_evolution} does not exist for pre_evolution`
                    );
            }
        }
        if (post_evolution) {
            const postPokemon = await getPokemonModel(post_evolution);
            if (postPokemon.length === 0) {
                return res
                    .status(400)
                    .send(
                        `Pokemon with id ${post_evolution} does not exist for post_evolution`
                    );
            }
        }

        // vérification de l'existance des types
        const { type1_id, type2_id } = req.body;
        if (type1_id) {
            const type = await getTypeModel(type1_id);
            if (type.length === 0) {
                return res
                    .status(400)
                    .send(`Type with id ${type1_id} does not exist for type_1`);
            }
        }
        if (type2_id) {
            const type = await getTypeModel(type2_id);
            if (type.length === 0) {
                return res
                    .status(400)
                    .send(`Type with id ${type2_id} does not exist for type_2`);
            }
        }

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
        await updatePokemonModel(req);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const deletePokemon = async (req, res) => {
    try {
        const result = await deletePokemonModel(req.params.pokemonId);
        return res.status(200).end(result);
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

module.exports = {
    listPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon,
};

const chekName = async (name) => {
    try {
        pokemonsList = await getPokemonsModel();
    } catch (err) {
        return;
    }
};
