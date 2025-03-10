
const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    status : {
        type : String,
        enum : {
            values : ["ignore", "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`,
        }
    }
});
exports.modules = connectionRequestSchema;
