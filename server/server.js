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
import gameRoute from './routes/search.js';
import tournamenetRoute from './routes/tournament.js';
import loginProdiver from './routes/loginProviders.js';
import { match, puzzels, tournaments, users } from './mongoDB.config.js';
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
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    return done(null, user);
});

app.get("/test", (req, res) => {
    res.json({ mes: "success" });
});

app.use("/auth/41v", routes);
app.use("/auth/42v", loginProdiver);
app.use("/tournamenet", tournamenetRoute);
app.use("/match", gameRoute);

const runServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(":::::::CONNECTED::::::::");
        server.listen(port);

        const io = new Server(server, {
            allowEIO3: true,
            cors: {
                origin: process.env.GAME_URL,
                methods: ["GET", "POST"],
            }
        });

        io.on("connection", (socket) => {

            socket.on("Greeting", (greetingMsg) => {
                socket.emit("Greeting", greetingMsg)
            });
            
            socket.on("createRoom", (room) => {
                
                socket.join(room);
    
                socket.on("message", (msg) => {
                    socket.broadcast.emit("message", msg);
                });
    
                socket.on("chatBox", (chatMsg) => {
                    io.emit("chatBox", formateDate(chatMsg, socket.id));
                });                
            });
        });

    } catch (error) {
        console.log(`Internal server error: ${error}`);
    }
};

function formateDate(message, id) {
    return {
        message,
        id,
        time: new Intl.DateTimeFormat('default', {
            hour: "numeric",
            minute: "numeric",
        }).format(new Date()),
    };
}

runServer();