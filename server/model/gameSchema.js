import mongoose from "mongoose";

const matchSchema = mongoose.Schema({
    matchId: { type: String },
    recordMoves: { type: [String] },
});

const tournamentSchema = mongoose.Schema({});

export const match = mongoose.model("match", matchSchema);