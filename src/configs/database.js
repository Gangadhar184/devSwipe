//key - mongodb+srv://gangadhar:dvbH95HkTmgtOyuN@cluster0.a4jhg.mongodb.net/

const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://gangadhar:dvbH95HkTmgtOyuN@cluster0.a4jhg.mongodb.net/devSwipe"
        );
};

module.exports = connectDB;


