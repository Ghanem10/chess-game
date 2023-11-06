import { StatusCodes } from "http-status-codes";
import { BadRequest, Unauthorized } from "../error/error.js";
import { SchemaUser } from "../model/userSchema.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await SchemaUser.findOne({ email });

    try {
        if (!user.email) {
            throw new Unauthorized("Email is incorrect!");
        }

        const isPassword = await user.comparePassword(password);

        if (!isPassword) {
            throw new Unauthorized("Password is incorrect!");
        }

        const token = await user.createJWT();
        const accessToken = `Bearer ${token}`;
        res.status(StatusCodes.OK).json({ ...user._doc, accessToken });
    } catch (error) {
        console.log(`Error/Login: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({ mes: `Error/login: ${error}`});
    }
};

export const register = async (req, res) => {
    const email = req.body.email;
    const checkEmail = await SchemaUser.findOne({ email });

    try {
        if (checkEmail) {
            throw BadRequest("Email already exists.");
        } else {
            await SchemaUser.create({ ...req.body });
            res.status(StatusCodes.CREATED).json({ mes: "Success.."});
        }
    } catch (error) {
        console.log(`Error/register: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({ mes: `Error/register: ${error}`});
    }
};