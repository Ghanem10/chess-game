
/**
 * Project: Chess game.
*/

import { config } from "dotenv"; config();

import http from "node:http";
import express from "express";
import Database from "./config/database.js";
import userRoute from "./route/playerAuth.route.js";
import tournamentRoute from "./route/tournaments.route.js";
import searchForActivePlayers from "./controllers/search.controller.js";

import { Server } from "socket.io";
import { formateDate, room } from "./util/helper.functions.js";

import cors from "cors";
import morgan from "morgan";
import passport from "passport";


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


app.use(express.json());
app.use(morgan("dev"));


app.get("/test", (req, res) => {
    res.status(200).json({ message: "Server is up and running!" });
});


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
        origin: process.env.GAME_URL,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    /**
     * @var {Array} onlineUsers - stores all online users.
     * 
     * @param {Number} roomId - unique room id, generated on client.
     * @param {Object} players - an object containing the players ids in room.
     * @param {Object} matchInfo - an object with key: value holding the room name and id.
     * 
    */

    onlineUsers.push(socket);

    socket.on("error", () => console.log("Connection error"));

    socket.on("enter-room-on-match-start", (matchInfo) => {
        socket.join(matchInfo.room);
    });

    socket.on("join-room", (matchInfo) => {
        socket.join(matchInfo.room);
    });

    socket.on("room-game-moves", (matchInfo, movePlayed) => {
        socket.broadcast.to(matchInfo.room).emit("Move played", movePlayed);
    });

    socket.on("room-chat-box", (matchInfo, chatMessage) => {
        io.to(matchInfo.room).emit("Chat message", formateDate(chatMessage));
    });

    socket.on("room-game-new-game", (matchInfo, playerId) => {
        io.sockets.sockets.get(playerId).leave(matchInfo.room);
    });

    socket.on("online-players", () => {
        io.emit(onlineUsers.length);
    });

    socket.on("disconnect", () => {

        const disconnectedPlayerIdx = onlineUsers.indexOf(socket);
        onlineUsers.splice(disconnectedPlayerIdx, 1);

    });
});

server.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`));