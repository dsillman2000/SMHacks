
module.exports = function(app, passport) {

  // route to test if the user is logged in or not
  app.get('/loggedin', function(req, res) {
    console.log("User is loggged in? " + (req.isAuthenticated() ? "Yes - username: " + req.user.email : "No"));
    if (req.user) req.user.password = undefined;
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // route to log in
  app.post('/api/v1/account/login', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        console.log("auth complete");
          if (err) { return next(err); }// Error 500

          if (!user) {
              //Authentication failed
              console.log("Auth failed");
              return res.sendStatus(401);
          }
          //Authentication successful
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({
              success: true,
              id: user.id
            });
          });
      })(req, res, next);
  });

  app.post('/api/v1/account/loginadmin', function(req, res, next) {
      passport.authenticate('local-login-admin', function(err, user, info) {
        console.log("auth complete");
          if (err) { return next(err); }// Error 500

          if (!user) {
            //Authentication failed
            console.log("Auth failed - no user");
            return res.sendStatus(401);
          }
          if (user.isadmin != 1) {
            console.log("Auth failed - not an admin");
            return res.sendStatus(401);
          }
          //Authentication successful
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            user.password = undefined;
            return res.send(req.user);
          });
      })(req, res, next);
  });

  // passport.authenticate('local-login', { failWithError: true }), function(req, res) {
  //   res.send(req.user);
  // });

  app.post('/api/v1/account/register', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) {
          if (err) { return next(err); }// Error 500

          if (!user) {
              //Authentication failed, user already exists
              return res.sendStatus(401);
          }
          //Authentication successful
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            
            return res.json({
              success: true,
              id: user.id
            });
          });
      })(req, res, next);
  });

  // route to log out
  app.post('/logout', function(req, res){
    req.logOut();
    res.sendStatus(200);
  });
}