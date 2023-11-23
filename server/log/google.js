
import { config } from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Google } from "../model/userSchema.js";
config();

const GoogleAuth = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_URL,
        scope: ['profile']
    },
    async (accessToken, refreshToken, profile, done) => {
        let user = await Google.findOne({ id: profile.id });
        
        try {
            if (user) {
                user.accessToken = accessToken;

                await user.save();
                return done(null, user);
            } else {
                user = Google.create({
                    id: profile.id,
                    username: profile.displayName,
                    accessToken: accessToken,
                    picture: profile.picture,
                    email: profile.given_name + "@gmail.com",
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

export default GoogleAuth;