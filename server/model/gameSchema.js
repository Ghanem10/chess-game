import mongoose from "mongoose";

const matchSchema = mongoose.Schema({
    matchId: { type: String },
    recordMoves: { type: [String] },
});

export const tournamentSchema = mongoose.model("match", matchSchema);