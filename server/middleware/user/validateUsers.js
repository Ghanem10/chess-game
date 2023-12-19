import { check, validationResult } from 'express-validator';
import User from '../../models/user.model.js';
import path from 'path';
import fs from 'fs';

const addUserValidator = [
    check("name")
        .isLength({ min: 2 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " -"})
        .withMessage("Name is required")
        .custom((value, { req }) => {
            switch (true) {
                case value.length === 1:
                    throw new Error("Name must be at least 2 characters long");
                case value.length > 10:
                    throw new Error("Name cannot be more than 20 characters long");
                default:
                    return true;
            }
        })
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error(
                        "There is already an account associated with this email address"
                    );
                }
            } catch (error) {
                throw error;
            }
        }),
    check(
        "password",
        "Please enter a password with 4 or more characters"
    ).isLength({ min: 4 })
];

const addUserValidatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    const __dirname = path.resolve();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        if (req.files && req.files.length > 0) {
            const { filename } = req[0].files;
            const filePath = path.join(__dirname, `../../assets/usersAvatars/${filename}`);

            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log("Error occured while removing file");
                }

                console.log(`File ${filePath} was deleted`);
            });
        }

        res
            .status(400)
            .json({ errors: mappedErrors.map((error) => error.msg) });
    }
};

export { addUserValidator, addUserValidatorHandler };