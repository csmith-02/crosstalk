const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user_src: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    user_dest: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    body: {
        type: String,
        require: true,
        trim: true,
        maxLength: 160
    },
    conversation_id: {
        type: mongoose.Types.ObjectId,
        require: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);