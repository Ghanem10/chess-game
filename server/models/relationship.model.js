import mongoose from 'mongoose';

const relationshipSchema  = new mongoose.Schema({
    
    connectedfriends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
}, { timestamps: true });

export default mongoose.model("Relationship", relationshipSchema);