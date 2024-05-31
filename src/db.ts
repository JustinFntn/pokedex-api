import sqlite3 from "sqlite3";

let db = new sqlite3.Database("db/pokedex.sqlite", (err: Error | null) => {
    if (err) {
        throw err.message;
    }
    console.log("Connected to the pokedex.sqlite database.");
});

export default db;
