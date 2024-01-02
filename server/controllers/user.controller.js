import { config } from 'dotenv'; config();
import User from '../models/user.model.js';
import Token from '../models/token.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 *  @param req - Express request object
 *  @param res - Express response object
 *  @param {Function} next - Express next function
*/


/** @route POST /user/signin */

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: { $eq: email } });

        if (!existingUser) {
            return res.status(404).json({ message: "Invalid credentials." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const payload = {
            _id: existingUser.id,
            email: existingUser.email
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "6d",
        });

        const newRefreshToken = new Token({
            user: existingUser.id,
            accessToken,
            refreshToken,
        });

        await newRefreshToken.save();

        res.status(200).json({
            accessToken,
            refreshToken,
            accessTokenUpdateAt: new Date().toLocaleString(),
            user: {
                _id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                avatar: existingUser.avatar,
                points: existingUser.points,
                wins: existingUser.wins,
                losses: existingUser.losses,
                draws: existingUser.draws,
            },
        })
    } catch (error) {
        res.status(500).json({ message: `Something went wrong, message: ${error}`});
    }
};

/** @route GET /user/:id */

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id }).select("-password").lean();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/** @route POST /user/signup */

const addUser = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    const fileUrl = req.files?.[0]?.filename 
            ? `${req.protocol}://${req.get("host")}/assets/usersAvatars/${req.files[0].filename}`
            : defaultAvatar;

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: fileUrl,
    });

    try {
        await newUser.save();

        if (newUser.isNew) {
            throw new Error("Filed to add user.");
        }

        res.status(201).json({ message: "User added successfully." });
    } catch (error) {
        res.status(400).json({ message: "Failed to add user." });
    }
};

/** @route POST /user/logout */

const logout = async (req, res) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[0] ?? null;
    
        if (accessToken) {
            await Token.deleteOne({ accessToken });
        }

        res.status(200).json({ message: "Logout successful." });

    } catch (error) {
        res.status(500).json({ message: "Internal server error, please try again later." });
    }
};

/** @route POST /user/refresh-token */

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const existingToken = await Token.findOne({
            refreshToken: { $eq: refreshToken },
        });

        if (!existingToken) {
            res.status(401).json({ message: "Invalid refresh token." });
        }

        const existingUser = await User.findById(existingToken.user);
        if (!existingUser) {
            res.status(401).json({ message: "Invalid refresh token." });
        }

        const refreshTokenExpiresAt = jwt.decode(existingToken.refreshToken).exp * 1000;
        if (Date.now() >= refreshTokenExpiresAt) {
            await existingToken.deleteOne();
            return  res.status(401).json({ message: "Expired refresh token." });
        }

        const payload = {
            _id: existingUser.id,
            email: existingUser.email,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });

        res.status(201).json({
            accessToken,
            refreshToken: existingToken.refreshToken,
            accessTokenUpdateAt: new Date().toLocaleString(),
        });

    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
};

export { signin, getUser, addUser, refreshToken, logout };