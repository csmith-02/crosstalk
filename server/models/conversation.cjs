const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    user_one: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    user_two: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);