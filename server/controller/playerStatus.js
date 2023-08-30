
import { StatusCodes } from "http-status-codes";
import { SchemaUser } from "../model/schema.js";

export const getPlayerStatus = async (req, res) => {

    try {
        
        // Get the player info from req.body
        const { playerID, rating } = req.body;
    
        // Find the player by ID and update its rating/wins/losses
        const playerInfo = await SchemaUser.findByIdAndUpdate(
            { 
                _id: playerID 
            }, 
            { 
                rank: rating.rank,
                wins: rating.wins,
                losses: rating.losses
            },
        );
        
        // Send back the player's info
        res.status(StatusCodes.OK).json({ player: playerInfo });
    } catch (error) {
        
        // Error handler for any error might occur while storing player's info
        res.status(StatusCodes.BAD_REQUEST).json({ mes: `Something went wrong: ${error}` });
    }
};