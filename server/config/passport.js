import { config } from "dotenv"; config();

import User from '../models/user.model.js';
import Token from '../models/token.model.js';

import JwtStrategy, { ExtractJwt } from 'passport-jwt';
import passport from "passport";
import jwt from 'jsonwebtoken';

const opitions = {};
opitions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opitions.secretOrKey = process.env.JWT_SECRET;


passport.use(new JwtStrategy(opitions, async function(jwt_payload, done) {
    try {
        const user = await User.findOne({ email: jwt_payload.email });
        
        if (user) {
            const refreshTokenFromDB = await Token.findOne({ user: user._id });

            if (!refreshTokenFromDB) {
                return done(null, false);
            }

            const refreshPayload = jwt.verify(
                refreshTokenFromDB.refreshToken,
                process.env.REFRESH_SECRET
            );

            if (refreshPayload.email !== jwt_payload.email) {
                return done(null, false);
            }

            const tokenExpiration = new Date(jwt_payload.exp * 1000);
            const now = new Date();
            const timeDifference = tokenExpiration.getTime() - now.getTime();

            if (timeDifference > 0 && timeDifference < 30 * 60 * 1000) {
                const newPayload = {
                    _id: user._id,
                    email: user.email
                };
                
                const newToken = jwt.sign(newPayload, process.env.JWT_SECRET, {
                    expiresIn: "6h"
                });

                return done(null, { user, newToken });
            }

            return done(null, { user });
        }
    } catch (error) {
        done(error, false);
    }
}));