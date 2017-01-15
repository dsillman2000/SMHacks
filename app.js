var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//==================================================================
// initialize PassportJS with proper strategies

//define strategy for PassportJS
require('./auth/passport')(passport);

var auth = function(req, res, next){
  if (!req.isAuthenticated())
  	res.send(401);
  else
  	next();
};

//==================================================================
// Start express application

var app = express();

//Helmet helps with security, deals with several vulnerbilities
// var helmet = require('helmet');
// app.use(helmet);

//Prevent powered by header to prevent targeted attacks
app.disable('x-powered-by');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var session  = require('express-session');
//var MySQLStore = require('express-mysql-session')(session);

//var dbconfig = require('./db/dbconfig');
//var options = {
//  host: dbconfig.host,
//  user: dbconfig.user,
//  port: 3306,
//  password: dbconfig.password,
//  database: 'session_info',
//  createDatabaseTable: true
//};

//var sessionStore = new MySQLStore(options);


// required for passport
// using mysql-session bc better, no memory leaks (default is not good)

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//assert.equal(query.exec().constructor, global.Promise);
mongoose.connect('mongodb://socratik:verysecure@ds111479.mlab.com:11479/socratik');

var expressSession = session({
  key: 'mysecurekey',
	secret: 'n5dQg3Tgc0kfd03e',
//  store: sessionStore,
	resave: true,
	saveUninitialized: true
})
app.use(expressSession); 

app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

//==================================================================

//add paths for Authentication
require('./auth/authpaths')(app, passport);
//add API Router
app.use('/api/v1', require('./api/api'));
//static file server from /public folder
app.use(express.static(path.join(__dirname, 'public')));

//return 404 page if path is not found
app.use(function(req,res) {
  res.type('txt').send('Path not found');
});

//start the server

var server = http.createServer(app);

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('...listening on port ' + port)
});

var io = require('socket.io')(http).listen(server);
var chatSetup = require('./socket/socketSetup');
chatSetup(io, expressSession, passport);