
/**
 * Project: Chess game.
*/

import { config } from "dotenv"; config();

import http from "node:http";
import express from "express";
import Database from "./config/database.js";
import userRoute from "./route/playerAuth.route.js";
import initializePassport from "./config/passport.js";
import tournamentRoute from "./route/tournaments.route.js";
import searchForActivePlayers from "./controllers/search.controller.js";

import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import { formateDate } from "./util/helper.functions.js";

import cors from "cors";
import morgan from "morgan";
import passport from "passport";

import { fileURLToPath } from 'url';
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const db = new Database(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


db.connect().catch((error) => {
    console.log("Error connecting to database", error);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

initializePassport(passport);

app.use(express.json());
app.use(morgan("dev"));


app.get("/test", (req, res) => {
    res.status(200).json({ message: "Server is up and running!" });
});

app.use(
    "/assets/usersAvatars",
    express.static(path.resolve(__dirname, 'assets/usersAvatars'))
);

app.use("/search", searchForActivePlayers);

app.use("/user", userRoute);
app.use("/tournament", tournamentRoute);


process.on("SIGINT", async () => {
    try {
        await db.disconnect();
        console.log("Disconnected from database");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
});

/**
 * @param {http.server} server 
*/

const onlineUsers = [];

const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: process.env.NODE_ENV === "production"
                ? process.env.GAME_URL
                : "http://localhost:4000",
        methods: ["GET", "POST"],
    },
});

let rooms = [];

io.on("connection", (socket) => {

    onlineUsers.push(socket);

    socket.on("error", () => console.log("Connection error"));

    socket.on("enter-room-on-match-start", (matchInfo) => {

        let room = rooms.find(room => room.players.length < 2);

        if (!room) {
            room = { id: uuidv4(), players: [] };
            rooms.push(room);
        }

        const existingWhitePlayer = room.players.find(
            (player) => player.team === "white"
        );

        let newPlayerTeam;

        if (existingWhitePlayer) {
            newPlayerTeam = "black";
        } else {
            newPlayerTeam = "white";
        }

        room.players.push(
            { 
                id: matchInfo.playerId,
                team: newPlayerTeam,
            },
        );

        socket.join(room.id);
        socket.emit("joined-room", room);
    });

    socket.on("room-game-moves", (room, move) => {
        socket.broadcast.to(room).emit("room-game-moves", move);
    });

    socket.on("room-chat-box", (room, message) => {
        io.to(room).emit("room-chat-box", formateDate(message, socket.id));
    });

    socket.on("leave-current-room", (matchInfo) => {
        for (let i = 0; i < rooms.length; i++) {
            
            const room = rooms[i];

            const playerIdx = room.players.findIndex(
                (player) => player.id === matchInfo.playerId
            );

            if (playerIdx !== -1) {

                room.players.splice(playerIdx, 1);
                socket.leave(room.id);
                break;
            }
        }
    });

    socket.on("online-players", () => {
        io.emit(onlineUsers.length);
    });

    socket.on("notify-player", (playerId) => {
        io.to(playerId).emit("notify-player", "Hello there!");
    });

    socket.on("disconnect", () => {

        const disconnectedPlayerIdx = onlineUsers.indexOf(socket);
        onlineUsers.splice(disconnectedPlayerIdx, 1);

    });
});

server.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`));