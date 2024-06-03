import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import { User, createUserModel, getUserModel } from "./users.model";

const createUser = async (req: any, res: any) => {
    try {
        if (validator.isEmail(req.body.email)) {
            req.body.password = await brcypt.hash(req.body.password, 10);
            await createUserModel(req.body);
            return res.status(200).send(`User created`);
        } else {
            return res.status(400).send("Email is not valid");
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const loginUser = async (req: any, res: any) => {
    try {
        const User: User | undefined = await getUserModel(req.body.email);
        if (User === undefined) {
            return res.status(404).send("User not found");
        }
        if (await brcypt.compare(req.body.password, User.password)) {
            return res.status(200).send({
                token: jwt.sign({ email: User.email }, "voldemort", {
                    expiresIn: "1h",
                }),
            });
        }
        return res.status(401).send("Wrong password");
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { createUser, loginUser };
