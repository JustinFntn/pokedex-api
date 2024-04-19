const { db } = require(`../db`);

const getPokemonsModel = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM pokemons`, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getPokemonModel = (pokedexId) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM pokemons WHERE pokedexId = ${pokedexId}`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};

const addPokemonModel = (newPokemon) => {
    return new Promise((resolve, reject) => {
        newPokemon.nom = `'${newPokemon.nom}'`;

        const keys = Object.keys(newPokemon);
        const values = Object.values(newPokemon);

        const sql = `INSERT INTO pokemons (${keys.join(
            ", "
        )}) VALUES (${values.join(", ")})`;

        db.run(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve("Pokemon created");
        });
    });
};

const updatePokemonModel = (req) => {
    return new Promise((resolve, reject) => {
        const pokedexId = req.params.pokemonId;
        let updatePokemon = req.body;

        updatePokemon.nom = `'${updatePokemon.nom}'`;

        const keys = Object.keys(updatePokemon);
        const values = Object.values(updatePokemon);

        const setValues = keys
            .map((key, index) => {
                return `${key} = ${values[index]}`;
            })
            .join(", ");

        const sql = `UPDATE pokemons SET ${setValues} WHERE pokedexId = ${pokedexId}`;

        db.run(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve("Pokemon updated");
        });
    });
};

const deletePokemonModel = (pokedexId) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM pokemons WHERE pokedexId=${pokedexId}`, (err) => {
            if (err) {
                reject(err);
            }
            resolve("Pokemon deleted");
        });
    });
};

module.exports = {
    getPokemonsModel,
    getPokemonModel,
    addPokemonModel,
    updatePokemonModel,
    deletePokemonModel,
};
