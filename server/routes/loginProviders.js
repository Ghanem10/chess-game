import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
import { 
    deleteGithubUser, 
    deleteGoogleUser, 
    getUserDataGithub, 
    getUserDataGoogle 
} from '../controller/providers/_withProviders.js';
config();

const loginProdiver = express.Router();

loginProdiver.route('/userInfo/github/:id').delete(deleteGithubUser).get(getUserDataGithub);
loginProdiver.route('/userInfo/google/:id').delete(deleteGoogleUser).get(getUserDataGoogle);

loginProdiver.route('/github').get(passport.authenticate('github', { scope: [ 'user:email' ] }));
loginProdiver.route('/github/callback').get(passport.authenticate("github", { 
        failureRedirect: `${process.env.MAIN_PAGE}/Login`
    }), (req, res) => { 
        const Id = res.req.user._id.toString();
        res.redirect(`${process.env.MAIN_PAGE}/Profile?id=${Id}`);
    });

loginProdiver.route('/google').get(passport.authenticate('google'));
loginProdiver.route('/google/callback').get(passport.authenticate("google", { 
        failureRedirect: `${process.env.MAIN_PAGE}/Login`
    }), (req, res) => { 
        const Id = res.req.user._id;
        res.redirect(`${process.env.MAIN_PAGE}/Profile?id=${Id}`);
    });

export default loginProdiver;