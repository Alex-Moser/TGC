/* Adds Express to current file and assigns it
   to the variable 'app'. */
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    Post            = require('./models/post'),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    Message         = require('./models/message'),
    Coversation     = require('./models/conversation'),
    moment          = require('moment'),
    fs              = require('fs'),
    multer          = require('multer'),
    cloudinary      = require('cloudinary'),
    dotenv          = require('dotenv').config();




// Requiring routes.
var commentRoutes   = require('./routes/comments'),
    postRoutes      = require('./routes/posts'),
    indexRoutes     = require('./routes/index'),
    messageRoutes   = require('./routes/messages');

// Conect to Post_yep db (database), if no db, creates one (i.e. the first time)
// mongoose.connect('mongodb://localhost/tgc', {useNewUrlParser: true});
var uri = process.env.PROD_MONGODB;


mongoose.connect(uri, {
  socketTimeoutMS: 45000,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectionTimeoutMS: 10000
});


// Get Mongoose to use the global promise library - TODO:async callback cleanup.
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended:true}));    // Body-parser boiler plate.
app.set('view engine', 'ejs');  // Assumes local files are .ejs files.
// __dirname [note: two underscores] refers to directory of current file.
app.use(express.static(__dirname + '/public')); // Tells Express to serve dir.
app.use(methodOverride('_method'));
app.use(flash());   // Flash Messages.


// Passport configuration.
app.use(require('express-session')({
    secret: "Lucy is the cutest dog in the whole world",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser= req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/posts/:id/comments', commentRoutes);
app.use(postRoutes);
app.use(messageRoutes);




// Listens on local server and notes this in terminal.
// app.listen(3000, () => console.log('Server has started.'));

// Listens on Heroku server
app.listen(process.env.PORT, '0.0.0.0');
