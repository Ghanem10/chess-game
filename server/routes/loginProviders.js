import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
config();

const loginProdiver = express.Router();

/**
 * Github and Google Routes 
*/
loginProdiver.route('/github').get(passport.authenticate('github', { scope: [ 'user:email' ] }));

loginProdiver.route('/github/callback')
    .get(passport.authenticate("github"), (req, res) => { 

        // Get github token from the res.
        const token = res.req._parsedUrl.query;

        // Redirect to the homepage with the token obtained.
        res.redirect(`${process.env.MAIN_PAGE}/profile?${token}`);
    });

loginProdiver.route('/google').get(passport.authenticate('google'));

loginProdiver.route('/google/callback')
    .get(passport.authenticate("google"), (req, res) => { 
        
        // Get github token from the res.
        const token = res.req._parsedUrl.query;
        
        // Redirect to the homepage with the token obtained.
        res.redirect(`${process.env.MAIN_PAGE}/profile?${token}`);
    });

export default loginProdiver;