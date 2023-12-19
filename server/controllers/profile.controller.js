import User from '../models/user.model.js';
import Relationship from '../models/relationship.model.js';
import mongoose from 'mongoose';


/** 
 * @route GET /user/public-friends 
 * @async
 * @function getPublicFriends
 * 
 * @param {String} req.body.id - the id of the user.
 * 
 * @description Get up to 7 users that already not friends with,
 * including their name avatar, status: [wins, losses, draws, and total-points]
 * sorted by the totalpoints the user earn - DESC.
*/

const getPublicFriends = async (req, res) => {
    try {
        const userId = req.body.id;
        const connectedFriendsIds = await Relationship.find({ connectedfriends: userId });

        const docUserID = mongoose.Types.ObjectId(userId);
        const excludedIds = [...connectedFriendsIds, docUserID];

        const friendsToDisplay = await User.aggregate([
            {
                $match: { 
                    _id: { $nin: excludedIds },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    avatar: 1,
                    wins: 1,
                    losses: 1,
                    draws: 1,
                    points: 1,
                },
            },
            {
                $sort: { points: -1 },
            },
            {
                $limit: 7,
            },
        ]);

        res.status(200).json(friendsToDisplay);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};


/** 
 * @route GET /user/public-friend/:id 
 * @async
 * @function getPublicFriendById
 * 
 * @param {String} req.body.id - the id of the current user.
 * @param {String} req.params.id - the id of the public friend to return.
 * 
 * @description Returns all the public friends avaliable to this user,
 * with their relative infomation e.g. name, email, status etc..
*/

const getPublicFriendById = async (req, res) => {
    try {
        const id = req.params.id;
        
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while retrieving the user." });
    }
};


/** 
 * @route GET /user/:id/connected-friends 
 * @async
 * @function getUsersFriends
 * 
 * @param {String} req.body.id - the id of the current user.
 * 
 * @description Returns all the connected friends for the current user.
*/

const getUsersFriends = async (req, res) => {
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


/** 
 * @route PATCH /user/:id/add-friend 
 * @async
 * @function addFriend
 * 
 * @param {String} req.body.id - the id of the current user.
 * @param {String} req.params.id - the id of the friend to add.
*/

const addFriend = async (req, res) => {
    try {
        const userId = req.body.id;
        const friendToAdd = req.params.id;
        
        const friendExists = await Relationship.exists({ connectedfriends: friendToAdd });
        
        if (friendExists) {
            res.status(400).json({ message: "Already have this user on friends list." });
        }

        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { connectedfrineds: friendToAdd } },
            { new: true },
        );

        await Relationship.create({ connectedfriends: friendToAdd });

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while adding a friend." });
    }
};


/** 
 * @route PATCH /user/:id/remove-friend 
 * @async
 * @function removeFriend
 * 
 * @param {String} req.body.id - the id of the current user.
 * @param {String} req.params.id - the id of the friend to remove.
*/

const removeFriend = async (req, res) => {
    try {
        const userId = req.body.id;
        const friendToRemove = req.params.id;

        const friendExists = await Relationship.exists({ connectedfriends: friendToRemove });

        if (!friendExists) {
            return res.status(400).json({ message: "You are not friend with this user." });
        }

        await User.findByIdAndUpdate(
            userId,
            { $pull: { connectedfrineds: friendToRemove } },
            { new: true },
        );

        await Relationship.deleteOne({ connectedfriends: friendToRemove });

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while removing a friend." });
    }
};


/** 
 * @route PUT /user/:id/update-status 
 * @async
 * @function updatePlayerStatus
 * 
 * @param {String} req.body.id - the id of the current user.
 * @param {Object} req.body.payloadStatus - the payload of the status of the player e.g. wins, losses, etc.
*/

const updatePlayerStatus = async (req, res) => {
    try {
        const userId = req.body.id;
        const payloadStatus = req.body;

        const newWinsNumber = payloadStatus.wins;
        const newLossesNumber = payloadStatus.losses;
        const newDrawsNumber = payloadStatus.draws;
        const newPointsNumber = payloadStatus.points;

        const updatedPlayerStatus = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    wins: newWinsNumber,
                    losses: newLossesNumber,
                    draws: newDrawsNumber,
                    points: newPointsNumber,
                },
            },
            {
                new: true,
            },
        )
        .select("wins losses draws points")
        .lean();

        res.status(200).json(
            { 
                message: "Player status updated sucessfully.", 
                updatedPlayerStatus 
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while updating player status." });
    }
};


const userSearchStatus = async (req, res) => {
    try {
        const userId = req.params.id;

        const t = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    searching: false,
                },
            },
            {
                new: true,
            },
        );

        res.status(200).json({ message: "Update success!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export { 
    addFriend, 
    removeFriend, 
    getPublicFriendById, 
    getPublicFriends, 
    getUsersFriends,
    updatePlayerStatus,
    userSearchStatus,
};