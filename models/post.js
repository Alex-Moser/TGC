
var mongoose = require('mongoose');

// Schema set-up
var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    seller: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// When we require this file, we get the following model.
module.exports = mongoose.model("Post", postSchema);
