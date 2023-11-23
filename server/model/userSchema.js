import mongoose, { mongo } from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../mongoDB.config.js';

const logWithGithub = new mongoose.Schema({
    id: { type: String, unique: true },
    username: { type: String },
    accessToken: { type: String },
    picture: { type: String },
    location: { type: String },
    email: { type: String },
    rank: { type: Number, default: 500 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
});


const logWithGoogle = new mongoose.Schema({
    id: { type: String, unique: true },
    username: { type: String },
    accessToken: { type: String },
    picture: { type: String },
    location: { type: String },
    email: { type: String },
    rank: { type: Number, default: 500 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: 2,
        maxlength: 16
    },
    email: {
        type: String,
        required: [true, 'Email is requrired.'],
        minlength: 4,
        maxlength: 40,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid Email'
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 3
    },
    rank: { type: Number, default: 500 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
});

UserSchema.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
});

UserSchema.methods.createJWT = function() {
    const payload = {
        user: { 
            id: this._id,
            user: this.name
        },
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_LIFETIME
    });
}

UserSchema.methods.comparePassword = async function(candatespassword) {
    const isMatch = await bcryptjs.compare(candatespassword, this.password);
    return isMatch;
}

const SchemaUser = users.model('User', UserSchema);
const Github = users.model("Github", logWithGithub);
const Google = users.model("Google", logWithGoogle);

export { SchemaUser, Github, Google };