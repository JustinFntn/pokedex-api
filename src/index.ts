import express from "express";

// swagger documentation
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json";

// routes
const typesRouter = require("./types/types.routes");
const pokemonsRouter = require("./pokemons/pokemons.routes");
const usersRouter = require("./users/users.routes");

//
const app = express();
const port = 3000;

app.use(express.json());
app.use(typesRouter);
app.use(pokemonsRouter);
app.use(usersRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
