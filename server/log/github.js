import { config } from 'dotenv';
import { Strategy as GithubStrategy } from 'passport-github';
import { SchemaAuthUser } from '../model/schema.js';
config();

const GitHubAuth = new GithubStrategy(
    {
        clientID: process.env.GITHUB_ID, 
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: process.env.GITHUB_URL
    }, 
    async (accessToken, refreshToken, profile, done) => {
        let user = await SchemaAuthUser.findOne({ "github.id": profile.id });

        try {
            if (user) {
                // If the user exist, update the github token.
                user.github.githubtoken = accessToken;
    
                // Save the changes in the db.
                await user.save();
                return done(null, user);
            } else {
                
                // If the user doesn't exist create one.
                user = new SchemaAuthUser({
                    github: { 
                        id: profile.id,
                        username: profile.displayName,
                        githubtoken: accessToken,
                        picture: profile.photos.value,
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



export default GitHubAuth;