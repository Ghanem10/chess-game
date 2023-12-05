import mongoose from "mongoose";
mongoose.set("strictQuery", false);

class Database {
    constructor(uri, opts) {
        this.uri = uri;
        this.opts = opts;
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, this.opts);
            console.log(`Connected to database: ${mongoose.connection.db.databaseName}`);
        } catch (error) {
            throw error;
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect(this.uri, this.opts);
            console.log(`Disconnected from database: ${mongoose.connection.db.databaseName}`);
        } catch (error) {
            throw error;
        }
    }
}

export default Database;