const express = require("express");
const { getTypesController, getTypeController } = require(`./types.controller`);
const router = express.Router();

router.get(`/types`, (req, res) => {
    getTypesController(req, res);
});

router.get(`/types/:typeId`, (req, res) => {
    getTypeController(req, res);
});

module.exports = router;
