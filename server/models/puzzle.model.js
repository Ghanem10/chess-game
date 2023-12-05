import mongoose from 'mongoose';

const puzzleSchema  = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    avaliable: {
        type: [String],
        status: Boolean,
        default: true,
    },

}, { timestamps: true });

export default mongoose.model("Puzzles", puzzleSchema);