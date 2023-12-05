import { config } from 'dotenv'; config();
import jwt from 'jsonwebtoken';

const decodeToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[0];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorizad" });
    }
};

export default decodeToken;