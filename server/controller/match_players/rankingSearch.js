
import mongoose from "mongoose";
import { users } from '../../mongoDB.config.js';

export const searchPlayers = async (req, res) => {
    const { id, rank } = req.body;
    
    const userCollections = users.collection("users");
    const googleCollections = users.collection("google");
    const githubCollections= users.collection("github");

    const candPlayers = await Promise.all([
        userCollections.find({
            _id: { $ne: id },
            rank: { $gte: rank - 10, $lte: rank + 10 },
        }).toArray(),
        googleCollections.find({
            _id: { $ne: id },
            rank: { $gte: rank - 10, $lte: rank + 10 },
        }).toArray(),
        githubCollections.find({
            _id: { $ne: id },
            rank: { $gte: rank - 10, $lte: rank + 10 },
        }),
    ]);
};