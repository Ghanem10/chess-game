import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './authentication/connect.js';
import authorizeMiddleWare from './error/middleware.js';
import session from 'express-session';
import GitHubAuth from './log/github.js';
import GoogleAuth from './log/google.js';
import passport from 'passport';
import routes from './authentication/routes.js';
import cors from 'cors';
config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
    connect.session() MemoryStore is not
    designed for a production environment, as it will leak
    memory, and will not scale past a single process.
 */

app.use(session({
    secret: process.env.GITHUB_SECRET,
    resave: true,
    saveUninitialized: true,
}));


app.use(session({
    secret: process.env.GOOGLE_SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(GitHubAuth);
passport.use(GoogleAuth);


passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/auth/github', passport.authenticate('github', { 
    scope: "user" 
}));


app.get('/auth/github/callback', 
    
    passport.authenticate("github", { 
        failureRedirect: "/login"
    }) ,(req, res) => {

    res.redirect('/page');
});


app.get('/auth/google', passport.authenticate('google'));


app.get('/auth/google/callback', 

    passport.authenticate("google", { 
        failureRedirect: "/login"
    }) ,(req, res) => {

    const { id, email, username } = req.user;
    res.json({ id, email, username });
});


app.use("/auth/41v", routes);
app.use("/page/41v", routes, authorizeMiddleWare);


const start = async () => {
    
    try {
    
        await connectDB(process.env.CLOUD_URL);
        
        app.listen(port);
    
    } catch (error) {
        console.log("internal error: ", error);
    }
}

start();