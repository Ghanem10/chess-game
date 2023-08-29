import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/connect.js';
import authorizeMiddleWare from './error/middleware.js';
import session from 'express-session';
import GitHubAuth from './log/github.js';
import GoogleAuth from './log/google.js';
import passport from 'passport';
import routes from './routes/routes.js';
import { StatusCodes } from 'http-status-codes';
import loginProdiver from './routes/loginProviders.js';
import { createRoom } from './player/room.js';
import { WebSocketServer } from 'ws';
import MemoryStore from 'memorystore';
import http from 'http';
import cors from 'cors';
config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });
const sessionMemo = new MemoryStore(session);

// Create a room for each connection
const rooms = new Map();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/**
 * Create a WS connection on the top of express
 * 
 * @function{createRoom(rooms, player1, player2)} 
 *      - Except two IDs after implementing the ranking system.
*/

wss.on("connection", (ws) => {

    ws.on("error", (error) => {
        ws.send(`Something went wrong: ${error}`)
    });

    /**
     * Initial set up.
     * @param{message} => { _ID, type, player1: id, player2: id, move: { x, y } }
    */

    ws.on("message", (message) => {

        const received = JSON.parse(message);

        // Once the players starts seraching in Queue - create a room
        if (received.type === "join") {

            // Create a unique room ID
            createRoom(rooms, message);

            // When the move has been played
        } else if (received.type === "move") {
        
            // Iterate over the current players
            wss.clients.forEach((client) => {

                try {
                    // Don't show moves for the same player who's playing
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
    
                        // Get the move's coordinates
                        const move = message.move;
                        
                        // Broadcast move to the other player
                        ws.send(JSON.stringify(move));
                    }

                } catch (error) {
                    // error handler
                    console.log(error);
                }
            });
        }

        // Close connection
        ws.close();
    });
});

/**
 * A middleware to support persistent login from users
*/

app.use(session({
    secret: process.env.SECRET_SESSION,
    store: new sessionMemo(),
    resave: true,
    saveUninitialized: true,
}));

/**
 * .initialize() Initialize Passport on the app instance.
 * .session() Enables persistent login with passport.JS on app.
*/

app.use(passport.initialize());
app.use(passport.session());

/**
 * Configure session middleware for passport to use GitHub and Google middlewares.
*/

passport.use(GitHubAuth);
passport.use(GoogleAuth);


/**
 * Save user info in a session to be obtained later.
*/

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    console.log(req.session.passport.user);
    return done(null, user);
});


/**
 * App Routes for JWT and login provider auth. 
*/

app.use('/auth', loginProdiver);
app.use('/auth/41v', routes);
app.use('/page/41v', routes, authorizeMiddleWare);

/**
 * Sign-out route
*/

app.post('/logout', function(req, res, next) {

    try {
        
        req.logout(function(error) {
    
            if (error) { 
    
                return next(error); 
            }
    
            res.redirect('/');
        });

    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            { 
                mes: `internal error: ${error}`
            }
        );
    }
});


const start = async () => {
    
    try {
    
        await connectDB(process.env.CLOUD_URI);
        app.listen(port);
    
    } catch (error) {

        console.log(error)
    }
}

start();