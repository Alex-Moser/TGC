var express      = require('express');
    router       = express.Router(),
    passport     = require('passport'),
    middleware   = require('../middleware'),
    moment       = require('moment'),
    User         = require('../models/user'),
    Post         = require('../models/post'),
    Message      = require('../models/message'),
    Conversation = require('../models/conversation')

// Gets the create new message to user_:id page.
router.get('/profile/:id/message', middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if (err) {
            console.log(err);
        } else {
            // Determine if a conversation already exists.
            Conversation.
            findOne({
                $or:
                [
                    {
                        'receiver._id': req.params.id,
                        'sender._id':req.user._id
                    },
                    {
                        'receiver._id': req.user._id,
                        'sender._id': req.params.id
                    }
                ]
            }).populate('messages').exec(function (err, conversation) {
                if (err){
                    console.log(err);
                // If no conversation exists.
                } else if (conversation === null) {
                    // Render the new message page.
                    res.render('messages/new', {recipient: foundUser});
                // If a conversation exists.
                } else {
                    User.findById(req.user._id).exec(function(err, user){
                        if (err){
                            console.log(err);
                        } else {
                            res.redirect('/profile/' + user._id + '/mymessages/' + conversation._id);
                        }

                    });

                }
            });

        }
    });
});

// Gets a page with all of the user's conversations
router.get('/profile/:id/mymessages', middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id).populate('conversations').exec(function(err, user){
        if (err) {
            console.log(err);
        } else {

            res.render('messages/mymessages', {user: user});
        }
    });
});

// Gets a single conversation
router.get('/profile/:id/mymessages/:conversation_id', middleware.isLoggedIn, function(req, res){
    Conversation.
    findById(req.params.conversation_id).
    populate('messages').
    exec(function(err, conversation){
        if (err) {
            console.log(err);
        } else {
            /* We need to make all messages received by req.params.id
               have the instance property read changed to true. */
            conversation.messages.reverse().forEach(function(message){
                if (message.sender._id != req.params.id) {
                    Message.updateOne({_id: message._id}, {read: true}, function(err, res){
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
            // Render the page for the conversation.
            res.render('messages/conversation', {conversation: conversation});

        }
    });
});


// Create - Send a message
router.post('/profile/:id/message', middleware.isLoggedIn, function(req, res){
    // Find the user that is the receiver of message.
    User.findById(req.params.id, function(err, receiver){
        if (err) {
            console.log(err);
        } else {
            // Now we have all the data we need to create a new message.
            Message.create({
                sender:{
                    _id: req.user._id,
                    username: req.user.username
                },
                receiver:{
                    _id: req.params.id,
                    username: receiver.username
                },
                text: req.body.text,
                read: false
            }, function(err, message){
                if (err) {
                    console.log(err)
                }
                // Message saved.
                else { // Now we handle the conversation aspect.
                    Conversation.
                    findOne({
                        $or:
                        [
                            {
                                'receiver._id': req.params.id,
                                'sender._id':req.user._id
                            },
                            {
                                'receiver._id': req.user._id,
                                'sender._id': req.params.id
                            }
                        ]
                    }, function(err, conversation){
                        if (err) {
                            console.log(err);
                        // If a conversation does not already exist,
                        } else if (conversation === null){
                            // create a new one.
                            Conversation.create({
                                sender: {
                                    _id: req.user._id,
                                    username: req.user.username
                                },
                                receiver: {
                                    _id: req.params.id,
                                    username: receiver.username
                                },
                                messages: [message],
                                last_message:{
                                    text: req.body.text,
                                    sender_id: req.user._id
                                }
                            }, function(err, newConversation){
                                // New conversation saved.
                                if (err) {
                                    console.log(err);
                                } else {
                                /* Add conversation to both users'
                                   conversations.*/
                                    // First add to receivers conversations.
                                    User.findById(req.params.id, function(err, foundReceiver){
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            foundReceiver.conversations.push(newConversation);
                                            // Then save the receiver's user model instance.
                                            foundReceiver.save(function(err, foundReceiver){
                                                if (err) {
                                                    console.log(err);
                                                }
                                            });
                                        }
                                    });

                                    // Second add to sender's conversations.
                                    User.findById(req.user._id, function(err, foundSender){
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            foundSender.conversations.push(newConversation);
                                            // Then save the sender's user model instance.
                                            foundSender.save(function(err, foundSender){
                                                if (err) {
                                                    console.log(err);
                                                }
                                            });
                                        }
                                    });
                                    // Redirect to receiver's profile.
                                    res.redirect('/profile/' + req.params.id);
                                }
                            });
                        } else { // If a conversation already exists,
                            // add the message to the conversation.
                            conversation.messages.push(message);
                            // Update the last_message_text of conversation.
                            conversation.last_message.text = message.text;
                            conversation.last_message.sender_id = req.user._id;
                            // Then save the conversation.
                            conversation.save(function(err, conversation){
                                if (err) {
                                    console.log(err);
                                } else {
                                    // Redirect to conversation.
                                    res.redirect('/profile/' + req.user._id + '/mymessages/' + conversation._id);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
