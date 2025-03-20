const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
    user_src: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    user_dest: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    accepted: {
        type: Boolean,
        require: true,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Friend_request', FriendRequestSchema);