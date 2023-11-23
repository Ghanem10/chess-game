import { config } from 'dotenv';
import { Strategy as GithubStrategy } from 'passport-github';
import { Github } from '../model/userSchema.js';
config();

const GitHubAuth = new GithubStrategy(
    {
        clientID: process.env.GITHUB_ID, 
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_URL
    }, 
    async (accessToken, refreshToken, profile, done) => {
        let user = await Github.findOne({ id: profile.id });

        try {
            if (user) {
                user.accessToken = accessToken;
                await user.save();
                return done(null, user);
            } else {
                user = Github.create({
                    id: profile.id,
                    username: profile.displayName,
                    accessToken: accessToken,
                    picture: profile.photos[0].value,
                    email: profile._json.email || profile._json.login + "@gmail.com",
                    location: profile._json.location,
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
);

export default GitHubAuth;