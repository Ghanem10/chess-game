import { ObjectId } from 'mongodb';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../db/connect';
config();

//jest-mongodb

describe('User Database Operations', () => {
    let db;

    beforeAll(async () => {

        // Connect to the DB
        await connectDB(process.env.CLOUD_URI);
        db = mongoose.connection;
    });

    afterAll(async () => {

        // Disconnect Mongoose
        await mongoose.disconnect();
    });

    it('should insert and retrieve a user', async () => {

        // Get a collection 
        const users = db.collection('users');

        // Create a user
        const mockUser = { _id: new ObjectId(), name: 'John' };
        await users.insertOne(mockUser);

        // Check the inserted user is the same as the mockUser
        const insertedUser = await users.findOne({ _id: mockUser._id });
        expect(insertedUser).toEqual(mockUser);

        // Clean up the inserted data after testing
        await users.deleteOne({ _id: mockUser._id });
    });
});
