import express from "express";

// swagger documentation
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json";

// routes
import { router as typesRouter } from "./type/types.routes";
import { router as pokemonsRouter } from "./pokemons/pokemons.routes";
import { router as usersRouter } from "./users/users.routes";

//
const app: express.Application = express();
const port: number = 3000;

app.use(express.json());
app.use(typesRouter);
app.use(pokemonsRouter);
app.use(usersRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
