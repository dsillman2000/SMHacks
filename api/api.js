var Group = require('../db/models/group');

var route = require('express').Router();

var auth = function(req, res, next){
  if (!req.isAuthenticated())
  	res.redirect('/');
  else
  	next();
};

route.use(auth);

route.get('/', function(req, res) {
  res.json({ success: true });
});

route.get('/apicall/:key', function(req, res) {
	// res.send('api called successfully key is ' + req.params.key);

	res.json({ success: true });

});

route.post('/group/create', function(req, res) {
  
  var newGroup = Group({
    name: req.body.name,
    description: req.body.description,
    members: [{
  	  	id: req.user.id,
    		email: req.user.email,
  	  	firstname: req.user.firstname,
    		lastname: req.user.lastname
    }],
    admins: [req.user.id],
    questions: []
  });
  
  newGroup.save(function(err) {
    console.log("[USER] Created new group with name " + req.body.name);
    if (err) res.json({ success: false, error: err});
    else res.json({ success: false, id: newGroup.id});
  });
});

route.get('/creategroup', function(req, res) {
  console.log('user: ' + JSON.stringify(req.user));
//  var newGroup = Group({
//    name: "My Group",
//    desc: "The best group",
//    members: [{
//  	  	id: req.user.id,
//    		email: req.user.email,
//  	  	firstname: req.user.firstname,
//    		lastname: req.user.lastname
//    }],
//    admins: [req.user.id],
//    questions: []
//  });
//  
//  newGroup.save(function(err) {
//      console.log("saved group");
//  });
  
}); 

module.exports = route;