import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },
    
    avatar: {
        type: String,
    },
    
    connectedfrineds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    wins: { 
        type: Number,
        default: 0,
    },

    losses: { 
        type: Number,
        default: 0,
    },
    
    draws: { 
        type: Number,
        default: 0,
    },
    
    points: { 
        type: Number,
        default: 500,
    },

    puzzles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Puzzles",
        },
    ],

    oldGames: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OldGames",
        },
    ],

    searching: {
        type: Boolean,
        default: false,
    },
    
}, { timestamps: true });

export default mongoose.model("User", userSchema);