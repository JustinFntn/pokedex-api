const express = require("express");

const { createUser, loginUser } = require(`./users.controller`);

const router = express.Router();

router.post(`/users`, (req, res) => {
    createUser(req, res);
});

router.post(`/users/login`, (req, res) => {
    loginUser(req, res);
});

module.exports = router;
