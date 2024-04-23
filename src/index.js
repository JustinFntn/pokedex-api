const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger.json");

const { db } = require("./db");
const typesRouter = require("./types/types.routes");
const pokemonsRouter = require("./pokemons/pokemons.routes");
const usersRouter = require("./users/users.routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(typesRouter);
app.use(pokemonsRouter);
app.use(usersRouter);

const option = swaggerJsdoc(swaggerDocument);
console.log(option);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(option));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
