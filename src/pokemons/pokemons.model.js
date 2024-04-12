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

const getPokemonModel = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM pokemons WHERE id = ${id}`, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const addPokemonModel = (newPokemon) => {
    return new Promise((resolve, reject) => {
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

const updatePokemonModel = (id) => {
    return new Promise((resolve, reject) => {
        if (true) {
            console.log("modif");
            resolve("test");
        } else {
            reject("false");
        }
    });
};

const deletePokemonModel = (id) => {
    return new Promise((resolve, reject) => {
        if (true) {
            console.log("delete");
            resolve("test");
        } else {
            reject("false");
        }
    });
};

module.exports = {
    getPokemonsModel,
    getPokemonModel,
    addPokemonModel,
    updatePokemonModel,
    deletePokemonModel,
};
