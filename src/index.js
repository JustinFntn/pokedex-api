const express = require("express");
const { db } = require("./db");
const typesRouter = require("./types/types.routes");
const pokemonsRouter = require("./pokemons/pokemons.routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(typesRouter);
app.use(pokemonsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
