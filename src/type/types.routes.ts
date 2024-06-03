import express, { Router } from "express";
import { getTypesController, getTypeController } from "./types.controller";

const router: Router = express.Router();

router.get(`/types`, (req, res) => {
    getTypesController(req, res);
});

router.get(`/types/:typeId`, (req, res) => {
    getTypeController(req, res);
});

export { router };
