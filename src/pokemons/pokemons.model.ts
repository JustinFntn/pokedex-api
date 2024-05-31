import db from "../db";

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

const getPokemonModel = (pokedexId: number) => {
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

const addPokemonModel = (newPokemon: any) => {
    return new Promise((resolve, reject) => {
        newPokemon.nom = `'${newPokemon.nom}'`;

        const keys: string[] = Object.keys(newPokemon);
        const values: unknown[] = Object.values(newPokemon);

        const sql: string = `INSERT INTO pokemons (${keys.join(
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

const updatePokemonModel = (req: any) => {
    return new Promise((resolve, reject) => {
        const pokedexId: number = req.params.pokemonId;
        let updatePokemon: any = req.body;

        updatePokemon.nom = `'${updatePokemon.nom}'`;

        const keys: string[] = Object.keys(updatePokemon);
        const values: unknown[] = Object.values(updatePokemon);

        const setValues: string = keys
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

const deletePokemonModel = (pokedexId: number) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM pokemons WHERE pokedexId=${pokedexId}`, (err) => {
            if (err) {
                reject(err);
            }
            resolve("Pokemon deleted");
        });
    });
};

export {
    getPokemonsModel,
    getPokemonModel,
    addPokemonModel,
    updatePokemonModel,
    deletePokemonModel,
};
