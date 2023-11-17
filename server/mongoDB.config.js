import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
const users = db.useDb("users_login");

users.on("error", console.error.bind(console, "connection users_login error:"));
users.once("open", async () => {
    console.log("connection established to users_login DB");
});

const match = db.useDb("match");

users.on("error", console.error.bind(console, "connection match error:"));
match.once("open", async () => {
    console.log("connection established to match DB");
});

const tournaments = db.useDb("tournaments");

users.on("error", console.error.bind(console, "connection tournaments error:"));
tournaments.once("open", async () => {
    console.log("connection established to tournaments DB");
});

const puzzels = db.useDb("puzzels");

users.on("error", console.error.bind(console, "connection puzzels error:"));
puzzels.once("open", async () => {
    console.log("connection established to puzzels DB");
});