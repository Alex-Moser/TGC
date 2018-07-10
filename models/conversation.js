var mongoose = require('mongoose');

var conversationSchema = new mongoose.Schema({
    //sent first message
    sender:
    {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        username: String
    },
    // received first message
    receiver:
    {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        username: String
    },
    // array of messages
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    // last message in conversation
    last_message: {
        text: String,
        sender_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }
});

module.exports = mongoose.model('Conversation', conversationSchema);
