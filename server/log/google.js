
import { config } from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { SchemaAuthUser } from "../model/schema.js";
config();

const GoogleAuth = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_URL,
        scope: ['profile']
    },
    async (accessToken, refreshToken, profile, done) => {
        let user = await SchemaAuthUser.findOne({ "google.id": profile.id });
        
        try {

            if (user) {
                // If the user exist, update the google token.
                user.google.googletoken = accessToken;

                // Save the changes in the db.
                await user.save();
                return done(null, user);

            } else {

                // If the user doesn't exist create one.
                user = new SchemaAuthUser({
                    google: {
                        id: profile.id,
                        username: profile.displayName,
                        googletoken: accessToken,
                        picture: profile.picture,
                    }
                });
            }

            // Save it and return
            await user.save();
            return done(null, user);
        } catch (error) {
            
            return done(error);
        }
    }
);

export default GoogleAuth;