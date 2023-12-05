import mongoose from 'mongoose';

const oldGamesSchema  = new mongoose.Schema({
    
    opponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    moves: { 
        type: [String] 
    },

}, { timestamps: true });

export default mongoose.model("OldGames", oldGamesSchema);