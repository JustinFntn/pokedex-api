import db from "../db";

export interface Pokemon {
    nom: string;
    pokedexId: number;
    type1_id: number;
    type2_id?: number;
    pre_evolution?: number;
    post_evolution?: number;
}

const getPokemonsModel = (): Promise<Pokemon[]> => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM pokemons`,
            (err: Error | null, rows: Pokemon[]) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};

const getPokemonModel = (pokedexId: number): Promise<Pokemon | undefined> => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM pokemons WHERE pokedexId = ${pokedexId}`,
            (err, row: Pokemon | undefined) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            }
        );
    });
};

const addPokemonModel = (newPokemon: Pokemon): Promise<string> => {
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

const updatePokemonModel = (req: any): Promise<string> => {
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

        const sql: string = `UPDATE pokemons SET ${setValues} WHERE pokedexId = ${pokedexId}`;

        db.run(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve("Pokemon updated");
        });
    });
};

const deletePokemonModel = (pokedexId: number): Promise<string> => {
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
