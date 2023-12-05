import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    refreshToken: {
        type: String,
        required: true,
    },
    
    accessToken: {
        type: String,
        required: true,
    },

    createDate: {
        type: Date,
        default: Date.now(),
        expires: 5 * 50 * 50
    }
});

export default mongoose.model("Token", tokenSchema);