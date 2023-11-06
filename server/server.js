import GitHubAuth from './log/github.js';
import GoogleAuth from './log/google.js';
import MemoryStore from 'memorystore';
import session from 'express-session';
import routes from './routes/routes.js';
import { WebSocketServer, WebSocket } from 'ws';
import passport from 'passport';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import loginProdiver from './routes/loginProviders.js';
config();

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ noServer: true });
const sessionMemoStore = new MemoryStore(session);
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_SESSION,
    store: new sessionMemoStore(),
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(GitHubAuth);
passport.use(GoogleAuth);

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    return done(null, user);
});

app.use("/auth/41v", routes);
app.use("/auth/42v", loginProdiver);

const onSocketPreError = (e) => { console.log(e) };
const onSocketPostError = (e) => { console.log(e) };

const runServer = async () => {
    try {
        await mongoose.connect(process.env.CLOUD_URI);
        console.log(":::::::CONNECTED::::::::");
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
        console.log(`Internal server error: ${error}`)
    }
}

runServer();