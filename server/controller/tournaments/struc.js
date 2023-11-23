
import { tournaments } from "../../mongoDB.config.js";
import { tournamentSchema } from "../../model/gameSchema.js";

export const createTournament = async (req, res) => {
    try {
        const tournaments = await tournamentSchema.create(req.body);
        res.status(200).json({ tournaments });
    } catch (error) {
        console.log(error);
    }
};

export const updateTournament = async (req, res) => {
    const { id } = req.params;

    try {
        const tournaments = await tournamentSchema.findById({ _id: id });
        res.status(200).json({ tournaments });
    } catch (error) {
        console.log(error);
    }
};

export const deleteTournament = async (req, res) => {
    const { id } = req.params;

    try {
        const tournaments = await tournamentSchema.findByIdAndDelete({});
        res.status(200).json({ tournaments });
    } catch (error) {
        console.log(error);
    }
};

export const getTournament = async () => {
    try {
        const tournaments = await tournamentSchema.find({});
        res.status(200).json({ tournaments });
    } catch (error) {
        console.log(error);
    }
};