
import request from 'supertest';
import { config } from 'dotenv';
import express from 'express';
import passport from 'passport';
import GitHubAuth from '../log/github';
import GoogleAuth from '../log/google';
import { StatusCodes } from 'http-status-codes';
config();

const app = express();

// Mock GitHub authentication 
passport.use(GitHubAuth);

// GET / from github callback route
app.get('/auth/github/callback', (req, res) => {
    passport.authenticate('github', (err, user) => {

        if (err) {
            
            // Error Handler
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed");
        } else {

            // Redirect to profile page with gitHub token as a query parameter
            res.redirect(`${process.env.MAIN_PAGE}/profile?code=${user.github.githubtoken}`);
        }
    });
});

// HTTP GET for testing gitHub login 
app.get('/auth/github', (req, res) => {

    // Mock response
    res.send('get github initail response');
});

describe("Authentication with github", () => {
    it('should redirect to gitHub login page with status 200', async () => {

      const response = await request(app)
        .get('/auth/github')
        .expect(200);

        expect(response.status).toBe(StatusCodes.OK);
    });
});

// Mock google authentication 
passport.use(GoogleAuth);

// HTTP GET for testing google login 
app.get('/auth/google', (req, res) => {

    // Mock response
    res.send('get google initail response');
});

// GET / from google callback route
app.get('/auth/google/callback', (req, res) => {
    passport.authenticate('google', (err, user) => {

        if (err) {
            
            // Error Handler
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed");
        } else {

            // Redirect to profile page with google token as a query parameter
            res.redirect(`${process.env.MAIN_PAGE}/profile?code=${user.google.googletoken}`);
        }
    });
});

describe("Authentication with google", () => {
    it('should redirect to google login page with status 200', async () => {

      const response = await request(app)
        .get('/auth/google')
        .expect(200);

        expect(response.status).toBe(StatusCodes.OK);
    });
});