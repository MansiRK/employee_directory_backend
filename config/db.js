
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(DB_URI);

        console.log(
            `Database connected successfully at ${connection.connection.host}`
        );
    } catch (error) {
        console.error(
            `Database connection failed due to ${error.message}`
        );
        process.exit(1);
    }
};

module.exports = connectDB;
