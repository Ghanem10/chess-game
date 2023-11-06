import { StatusCodes } from "http-status-codes";
import { SchemaUser } from "../../model/userSchema.js";

const getUserData = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await SchemaUser.findById(id);
        res.status(StatusCodes.OK).json({ ...user._doc });
    } catch (error) {
        console.log(`Error/JWT: ${error}`);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await SchemaUser.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json({ mes: "User deleted."});
    } catch (error) {}
};

export {
    deleteUser, getUserData
};