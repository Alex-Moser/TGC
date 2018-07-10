var express = require('express');
// Preserves the req.params values from the parent router.
var router = express.Router({mergeParams: true});
var Post = require('../models/post');
var Comment = require('../models/comment');
// if we only run /middleware it opens index.js automatically (same for other dirs)
var middleware = require('../middleware');

// Comments New
router.get('/new', middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {post: post});
        }
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
            res.redirect("/");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // Add username and id to comment.
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(function(err,comment){
                        if(err){
                            console.log(err);
                        } else{
                        post.comments.push(comment);
                        post.save(function(err, post){
                            if(err){
                                console.log(err);
                            } else {
                                res.redirect('/posts/' + post._id);
                            }
                        });
                        }
                    });


                }
            });
        }
    });
});
// Comment edit route.
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/edit', {post_id: req.params.id, comment: foundComment});
        }
    });
});

// Comment update.
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComments){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/posts/' + req.params.id);
        }
    });
});

// Comment destroy route.
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else{
            res.redirect('/posts/' + req.params.id);
        }
    });
});

module.exports = router;
