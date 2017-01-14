// config/passport.js

var users = [{
   
   id: 'test id',
   email: 'testemail',
   password: 'hash',
   firstname: 'bob',
   lastname: 'smith'
    
}, {
   
   id: 'test id2',
   email: 'testemail2',
   password: 'has2h',
   firstname: 'bob2',
   lastname: 'smith2'
    
}];


// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
//var dbconfig = {
//  host: 'localhost',
//  user: 'root',
//  password: 'pass',
//  database: 'db',
//  dateStrings: true
//};
//var connection = mysql.createConnection(dbconfig);

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
//      connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
//        done(err, rows[0]);
//      });

        for (user in users) {
            if (user.id == id) {
                return user;
            }
        }
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            for (user in users) {
                if (user.email == username) {
                    returndone(null, false);
                }
            }
            
            var hashedPassword = bcrypt.hashSync(password, null, null);

            var newUser = {
    
               id: users.length,
               email: username,
               password: hashedPassword,
               firstname: req.body.firstname,
               lastname: req.body.lastname
                
            };
            users.push(user);
            
            return done(null, newUser);

//            connection.query("SELECT * FROM users WHERE email = ?",[username], function(err, rows) {
//                if (err)
//                    return done(err);
//                if (rows.length) { //User already exists
//                    return done(null, false);
//                } else {
                    // if there is no user with that username
                    // create the user
//                    var hashedPassword = bcrypt.hashSync(password, null, null);
//
//                    var newUser = {
//   
//                       id: users.length,
//                       email: username,
//                       password: hashedPassword,
//                       firstname: req.body.firstname,
//                       lastname: req.body.lastname
//                        
//                    };
//                    users.push(user);
//                    
//                    return done(null, newUser);

//                    var insertQuery = "INSERT INTO users ( name, email, password ) values (?,?,?)";
//
//                    connection.query(insertQuery,[req.body.name, username, hashedPassword], function(err, rows) {
//                        var newUser = {
//                          name: req.body.name,
//                          email: username,
//                          isadmin: 0,
//                          id: rows.insertId,
//                        };
//
//                        return done(null, newUser);
//                    });
//                }
//            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            console.log('Username: ' + username);
          
            var loginUser = null;
          
            for (user in users) {
                if (user.email == username) {
                    loginUser = user;
                    break;
                }
            }
            
            if (!user)
                return done(null, false);
            
            if (!bcrypt.compareSync(password, loginUser.password))
                return done(null, false);

            return done(null, loginUser);
          
          
          
          
            
            
//            connection.query("SELECT * FROM users WHERE email = ?",[username], function(err, rows){
//                if (err)
//                    return done(err);
//                if (!rows.length) { //User not found
//                    return done(null, false);
//                }
//
//                // if the user is found but the password is wrong
//                if (!bcrypt.compareSync(password, rows[0].password))
//                    return done(null, false); // create the loginMessage and save it to session as flashdata
//
//                // all is well, return successful user
//                var user = {
//                  name: rows[0].name,
//                  email: rows[0].email,
//                  isadmin: rows[0].isadmin,
//                  issuperadmin: rows[0].issuperadmin,
//                  id: rows[0].id
//                };
//                // console.log("user: " + JSON.stringify(rows[0]));
//                return done(null, user);
//            });
        })
    );

    passport.use(
        'local-login-admin',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
          console.log('Username: ' + username);
            connection.query("SELECT * FROM users WHERE isadmin = 1 AND email = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) { //User not found
                    return done(null, false);
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                var user = {
                  name: rows[0].name,
                  email: rows[0].email,
                  isadmin: rows[0].isadmin,
                  issuperadmin: rows[0].issuperadmin,
                  id: rows[0].id
                };
                // console.log("user: " + JSON.stringify(rows[0]));
                return done(null, user);
            });
        })
    );
};
