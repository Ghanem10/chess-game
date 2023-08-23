
import { config } from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import SchemaUser from "../model/schema.js";
config();

const GoogleAuth = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_URL,
        scope: ['profile']
    },
    async (accessToken, refreshToken, profile, done) => {
        let user = await SchemaUser.findOne({ "google.id": profile.id });
        
        try {
            if (user) {
                user.google.googletoken = accessToken;
                user.google.googletokenref = refreshToken;

                await user.save();
                return done(null, user);
            } else {
                user = new SchemaUser({
                    google: {
                        id: profile.id,
                        username: profile.username,
                        googletoken: accessToken,
                        googletokenref: refreshToken,
                    }
                });
            }

            await user.save();
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

export default GoogleAuth;