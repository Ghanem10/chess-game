import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({

    title: {
        type: String,
        minlength: 3,
        maxlength: 10,
        required: true,
        tirm: true,
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

}, { timestamps: true });

export default mongoose.model("Tournament", tournamentSchema);