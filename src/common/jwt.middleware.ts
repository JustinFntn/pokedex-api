import jwt from "jsonwebtoken";

const verifyJWT = (req: any, res: any, next: any) => {
    try {
        if (!req.headers.authorization) throw new Error("Token is missing");
        const token: string = req.headers.authorization.split(" ")[1];
        const decodedToken: string | jwt.JwtPayload = jwt.verify(
            token,
            "voldemort"
        );
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
};

export { verifyJWT };
