const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error("Token is missing");
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "voldemort");
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
};

module.exports = { verifyJWT };
