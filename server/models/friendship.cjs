const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
    user_one: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    user_two: {
        type: mongoose.Types.ObjectId,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Friendship', FriendshipSchema);