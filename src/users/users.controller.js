const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const { createUserModel, getUserModel } = require(`./users.model`);

const createUser = async (req, res) => {
    try {
        if (validator.isEmail(req.body.email)) {
            req.body.password = await brcypt.hash(req.body.password, 10);
            await createUserModel(req.body);
            return res.status(200).send(`User created`);
        } else {
            return res.status(400).send("Email is not valid");
        }
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const User = await getUserModel(req.body.email);
        if (!User) {
            return res.status(404).send("User not found");
        }
        if (await brcypt.compare(req.body.password, User.password)) {
            return res.status(200).send({
                email: User.email,
                token: jwt.sign({ email: User.email }, "voldemort", {
                    expiresIn: "1h",
                }),
            });
        }
        return res.status(401).send("Wrong password");
    } catch (err) {
        return res.status(500).end(err.message);
    }
};

module.exports = { createUser, loginUser };
