var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    location: String,
    date_joined: {type: Date, default: Date.now},
    last_online: {type: Date, default: Date.now},
    items_posted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    transaction_history: {
        purchases: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        sales: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    },
    conversations:
    [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
        }
    ]
});

// Adds methods to User
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
