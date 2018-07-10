var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    sender:
    {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        username: String
    },
    receiver:
    {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        username: String
    },
    date_sent: {type: Date, default: Date.now},
    text: String,
    read: Boolean // todo
});

module.exports = mongoose.model('Message', messageSchema);
