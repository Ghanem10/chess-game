import GitHubAuth from './log/github.js';
import GoogleAuth from './log/google.js';
import MemoryStore from 'memorystore';
import session from 'express-session';
import routes from './routes/routes.js';
import passport from 'passport';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import loginProdiver from './routes/loginProviders.js';
config();

const app = express();
const server = http.createServer(app);
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

const runServer = async () => {
    try {
        await mongoose.connect(process.env.CLOUD_URI);
        console.log(":::::::CONNECTED::::::::");
        server.listen(port);

        const io = new Server(server, {
            cors: {
                origin: process.env.NODE_ENV ? false : "http://localhost:5173"
            }
        });

        io.on("connection", (socket) => {

            socket.on("message", (msg) => {
                socket.broadcast.emit("message", msg);
            });

            socket.on("chatBox", (chatMsg) => {
                io.emit("chatBox", { chatMsg, id: socket.id  });
            });

            socket.on("endMatch", () => {
                io.emit("endMatch");
            });
        });

    } catch (error) {
        console.log(`Internal server error: ${error}`)
    }
};

runServer();