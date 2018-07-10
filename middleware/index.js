var Post = require('../models/post')
var Comment = require('../models/comment')
var Message = require('../models/message')
// All the middleware.
var middlewareObj = {};


middlewareObj.checkPostOwnership = function(req, res, next) {
    // Is user logged in.
    if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
            if(err){
                res.redirect('back');
            } else {
                if (!foundPost) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                // Does user own post.
                if(foundPost.seller.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // Is user logged in.
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                if (!foundComment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                // Does user own post.
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please login first.');
    res.redirect('/login');
}

module.exports = middlewareObj;
