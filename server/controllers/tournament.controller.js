import Relationship from "../models/relationship.model.js";
import Tournament from "../models/tournament.model.js";

/** 
 * @route GET /user/:id/connected-friends 
 * @async
 * @function createNewTournament
*/

const createNewTournament = async (req, res) => {

    const newTournament = new Tournament({
        title: req.body.title,
        members: req.body.members,
        createdAt: Date.now(),
    });

    await newTournament.save();
    
    res.status(201).json({ message: "Tournament created successfully." });
};


/** 
 * @route GET /tournament/:id/connected-friends 
 * @async
 * @function getConnectedUsers
 * 
 * @param {String} req.body.id - the id of the current user.
 * 
 * @description Returns all the connected friends to the current user.
*/

const getConnectedUsers = async (req, res) => {
    try {
        const userId = req.body.id;
        const connectedFriendsIds = await Relationship.find({ connectedfriends: userId });

        if (connectedFriendsIds.length <= 0) {
            return res.status(404).json({ message: "There is no friends to display." });
        }

        res.status(200).json(connectedFriendsIds);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};


const getTournamentInfo = async (req, res) => {};
const deleteTournament = async (req, res) => {};

export {
    createNewTournament,
    getConnectedUsers,
    getTournamentInfo,
    deleteTournament,
};