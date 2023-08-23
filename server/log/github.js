import { config } from 'dotenv';
import { Strategy as GithubStrategy } from 'passport-github';
import SchemaUser from '../model/schema.js';
config();

const GitHubAuth = new GithubStrategy(
    {
        clientID: process.env.GITHUB_ID, 
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        let user = await SchemaUser.findOne({ "github.id": profile.id });
        
        try {
            if (user) {
                user.github.gittoken = accessToken;
                user.github.gittokenref = refreshToken;

                await user.save();
                return done(null, user);
            } else {
                user = new SchemaUser({
                    github: {
                        id: profile.id,
                        username: profile.username,
                        gittoken: accessToken,
                        gittokenref: refreshToken,
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



export default GitHubAuth;