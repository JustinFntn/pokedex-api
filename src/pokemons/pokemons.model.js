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

const addPokemonModel = (id) => {
    return new Promise((resolve, reject) => {});
};

module.exports = { getPokemonsModel, getPokemonModel, addPokemonModel };
