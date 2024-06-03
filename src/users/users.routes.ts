import express, { Router } from "express";

import { createUser, loginUser } from "./users.controller";

const router: Router = express.Router();

router.post(`/users`, (req, res) => {
    createUser(req, res);
});

router.post(`/users/login`, (req, res) => {
    loginUser(req, res);
});

export { router };
