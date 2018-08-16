var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
var middleware = require('../middleware');

var   fs            = require('fs'),
      multer        = require('multer'),
      cloudinary    = require('cloudinary');

// Multer Set-Up
var imageStorage = multer.diskStorage({
  filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
  // reject non-image file types
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

var upload = multer({ storage: imageStorage, fileFilter: imageFilter});

// Cloudinary Set-Up
cloudinary.config({
  cloud_name: 'tgc-cloud',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Get Image Upload Page
router.get('/upload', function(req, res){
  res.render('imageUpload');
});


// INDEX - Lists of all of the posts in our array with an image for each.
router.get('/posts', function(req, res){
    // Get all posts from DB
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else{
            res.render("posts/index", {posts: allPosts});
        }
    });
});

// CREATE - Add new Post to db.
router.post('/posts', middleware.isLoggedIn, upload.single('image'), function(req, res){
    cloudinary.v2.uploader.upload(req.file.path, function(err, result){
        if (err) {
            console.log(err);
        }

        var format = result.format;
        req.body.imageId = result.public_id;
        var imageId = req.body.imageId;
        var imageCloudFileName = imageId + "." + format;

        /* Now we want to transform the image
         to a 250px by 250px square with fill mode. */
        req.body.image = 'https://res.cloudinary.com/tgc-cloud/image/upload/c_fill,g_center,h_250,r_0,w_250/' + imageCloudFileName;

        // Defines remaining variables
        var title = req.body.title;
        var image = req.body.image;
        // Description from HTML form.
        var desc = req.body.description;
        var seller = {
            id: req.user._id,
            username: req.user.username
        }
        // Creates an object with these values.
        var newPost = {title: title, image: image, description: desc, seller: seller};
        User.findById(req.user._id).populate('users').exec(function(err, foundUser){
            if(err) {
                console.log(err)
            } else {
            // Create new Post and save to DB
            Post.create(newPost, function(err, newlyCreated){
                if(err){
                    console.log(err);   // log any error
                } else {
                    newlyCreated.save();
                    foundUser.items_posted.push(newlyCreated);
                    foundUser.save();
                    res.redirect('/posts');    // redirect to posts page if no errors.
                }
            });
            }
        });

    })

});

// NEW - show form to create new Post
router.get('/posts/new', middleware.isLoggedIn, function(req, res){
    res.render('posts/new');  // HTML form to input new Post.
});

// SHOW - Shows more info about one Post.
router.get("/posts/:id", function(req, res){
    // find Post with specified ID.
    Post.findById(req.params.id).populate('comments').exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            res.render('posts/show', {post: foundPost});
        }
    });
});

// Edit Post route.
router.get('/posts/:id/edit', middleware.checkPostOwnership, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect('back')
        } else{
            res.render('posts/edit', {post: foundPost});
        }
    });
});

// Update Post route.
router.put('/posts/:id', middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect('/posts');
        } else {
            res.redirect('/posts/' + req.params.id);
        }
    });
});

// Purchase post item
router.get('/posts/:id/purchase', middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id).populate('seller.id').exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
        res.render('posts/purchase', {post: foundPost});
        }
    });
});

router.get('/posts/:id/purchase/conf/:user', middleware.isLoggedIn, function(req, res){
    Post.findByIdAndDelete(req.params.id).populate('seller.id').exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            User.findById(req.params.user).exec(function(err, foundUser){
                if (err){
                    console.log(err);
                } else {
                    var seller = foundPost.seller.id;
                    var buyer = foundUser;
                    // Adds item to Seller transaction_history
                    seller.transaction_history.sales.push(foundPost._id);
                    // Adds item to Buyer transaction_history
                    buyer.transaction_history.purchases.push(foundPost._id);
                    // Deletes Post from seller's items_posted
                    var index = seller.items_posted.indexOf(foundPost._id);
                    seller.items_posted.splice(index, 1);

                    if(!seller.items_posted.includes(foundPost._id) && seller.transaction_history.sales.includes(foundPost._id) && buyer.transaction_history.purchases.includes(foundPost._id)){
                        seller.save(function(err){
                            if(err){
                                console.log(err)
                            } else {
                                buyer.save(function(err){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        foundPost.remove(function(err){
                                            if (err){
                                                console.log(err);
                                            } else {
                                                res.redirect('/posts/');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
});

// Destroy Post route.
router.delete('/posts/:id', middleware.checkPostOwnership, function(req, res){
    Post.findById(req.params.id).populate('seller.id').exec(function(err, post){
        if(err){
            console.log(err);
        }else {
            User.findById(post.seller.id, function(err, user){
                var indexOfPost = user.items_posted.indexOf(req.params.id);
                user.items_posted.splice(indexOfPost, 1);
                user.save(function(err){
                    if(err){
                        console.log(err);
                    } else {
                        post.remove(function(err){
                            if(err){
                                console.log(err);
                            } else{
                                res.redirect('/posts/');
                            }
                        });
                    }
                });
            });
        }
    });
});

module.exports = router;
