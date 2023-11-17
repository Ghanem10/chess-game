import { StatusCodes } from "http-status-codes";
import { Github, Google } from '../../model/userSchema.js';

const getUserDataGithub = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Github.findById(id);
        res.status(StatusCodes.OK).json({ ...user.github });
    } catch (error) {
        console.log(`Error/updaingGithub: ${error}`);
    }
};


const getUserDataGoogle = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Google.findById(id);
        res.status(StatusCodes.OK).json({ ...user.google });
    } catch (error) {
        console.log(`Error/updaingGoogle: ${error}`);
    }
};


const deleteGithubUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Github.findByIdAndDelete({ _id: id });
        res.status(StatusCodes.OK).json({ mes: "User deleted."});
    } catch (error) {}
};

const deleteGoogleUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Google.findByIdAndDelete({ _id: id });
        res.status(StatusCodes.OK).json({ mes: "User deleted."});
    } catch (error) {}
};

export {
    deleteGithubUser,
    deleteGoogleUser, 
    getUserDataGithub,
    getUserDataGoogle
};