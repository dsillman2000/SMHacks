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