import mongoose from "mongoose";
import { config } from "dotenv";
config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
    console.log("connection established to DB");
});

const match = db.useDb("match");
const users = db.useDb("users_login");
const tournaments = db.useDb("tournaments");
const puzzels = db.useDb("puzzels");

export { users, match, puzzels, tournaments };