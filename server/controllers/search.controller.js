import User from "../models/user.model.js";


const searchForActivePlayers = async (req, res) => { 
    try {
        const userId = req.body.id;

        const currentUser = await User.findByIdAndUpdate(
            userId, { 
                $set: { searching: true },
            },
            { 
                new: true 
            },
        );

        const matchedPlayer = await User.find(
                {
                    _id: { 
                        $ne: currentUser 
                    },
                    points: { 
                        $gte: currentUser.points - 100,
                        $lt: currentUser.points + 100,
                    },
                    searching: true,
                },
            )
            .select("_id name points")
            .limit(1)
            .lean();

        res.status(200).json(matchedPlayer);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while seaching for player." });
    }
};

export default searchForActivePlayers;