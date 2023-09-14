import authorizeMiddleWare from './error/middleware.js';
import loginProdiver from './routes/loginProviders.js';
import { StatusCodes } from 'http-status-codes';
import { createRoom } from './player/room.js';
import { connectDB } from './db/connect.js';
import GitHubAuth from './log/github.js';
import GoogleAuth from './log/google.js';
import routes from './routes/routes.js';
import MemoryStore from 'memorystore';
import session from 'express-session';
import { WebSocketServer, WebSocket } from 'ws';
import passport from 'passport';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
config();

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ noServer: true });
const sessionMemoStore = new MemoryStore(session);
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * A middleware to support persistent login from users
*/

app.use(session({
    secret: process.env.SECRET_SESSION,
    store: new sessionMemoStore(),
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
    return done(null, user);
});

app.use('/auth', loginProdiver);
app.use('/auth/41v', routes);
app.use('/player', routes);
app.use('/page/41v', routes, authorizeMiddleWare);


app.post('/logout', function(req, res, next) {

    try {
        req.logout(function(error) {
            if (error) return next(error); 
            res.redirect('/');
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ mes: `internal error: ${error}` });
    }
});

//TODO, handle failing cases for either side, client & server.
const onSocketPreError = (e) => { console.log(e) }; // Error for HTTP failing case.
const onSocketPostError = (e) => { console.log(e) }; // Error for ws failing case.

    try {
        await connectDB(process.env.CLOUD_URI);
        const serverListeing = server.listen(port);

        serverListeing.on("upgrade", (req, socket, head) => {
            socket.on("error", onSocketPreError);

            if (!!req.headers['BadAuth']) {
                socket.write("HTTP/1.1 401 Unauthorized \r\n\r\n");
                socket.destroy();
                return;
            }
            
            webSocketServer.handleUpgrade(req, socket, head, (ws) => {
                socket.removeListener("error", onSocketPreError);
                webSocketServer.emit("connection", ws, req);
            });
        });

        webSocketServer.on("connection", (ws, req) => {
            ws.on("error", onSocketPostError);
            ws.on("message", (msg, isBinary) => {
                console.log(msg)
                webSocketServer.clients.forEach((client) => {
                    if (ws !== client && client.readyState === WebSocket.OPEN) {
                        client.send(msg, { binary: isBinary });
                    }
                })
            });
            ws.on("close", () => console.log("connection closed."));
        });

    } catch (error) {
        console.log(`Internal server error: ${error.message}`)
    }
