import express from "express";
import { searchPlayers } from "../controller/match_players/rankingSearch.js";

const gameRoute = express.Router();

gameRoute.route("/search").search(searchPlayers);

export default gameRoute;