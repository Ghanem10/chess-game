
import { config } from "dotenv";
import { Unauthorized } from "./error.js"
import jwt from 'jsonwebtoken';
config();

export default async function authorizeMiddleWare(req, res, next) {
    
    const AuthorizedHeaders = req.body.headers.Authorization;

    if (!AuthorizedHeaders || !AuthorizedHeaders.startsWith('Bearer ')){
        throw new Unauthorized('Invalid credentials.');
    }
    
    const token = AuthorizedHeaders.split(' ')[1];
    
    try {
    
        const verify = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = { userId: verify.userID, name: verify.name };
        next();
    
    } catch (error) {
    
        throw new Unauthorized('Did not verify token.');
    }
}