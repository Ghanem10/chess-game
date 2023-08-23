import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
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
    github: {
        id: {
            type: String
        },
        username: {
            type: String
        },
        gittoken: {
            type: String
        },
        gittokenref: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        username: {
            type: String
        },
        googletoken: {
            type: String
        },
        googletokenref: {
            type: String
        }
    }
});

UserSchema.pre('save', async function() {

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    console.log(this.password)
});

UserSchema.methods.createJWT = function () {

    const payload = {
        user: { 
            id: this._id,
            user: this.name
        }
    }
    
    return jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_LIFETIME
    });
}

UserSchema.methods.comparePassword = async function (candatespassword) {

    const isMatch = await bcryptjs.compare(candatespassword, this.password);
    return isMatch;
}

const SchemaUser = mongoose.model('User', UserSchema);

export default SchemaUser;