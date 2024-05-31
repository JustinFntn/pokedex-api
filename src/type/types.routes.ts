import express from "express";
import { getTypesController, getTypeController } from "src/type/types.model";

const router = express.Router();

router.get(`/types`, (req, res) => {
    getTypesController(req, res);
});

router.get(`/types/:typeId`, (req, res) => {
    getTypeController(req, res);
});

module.exports = router;
