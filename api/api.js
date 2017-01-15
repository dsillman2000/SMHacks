var User = require('../db/models/user');
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

route.get('/account/groups', function(req, res) {
  
  Group.find({'members.id': req.user.id}).exec(function(err, groups) {
     if (err) res.send({ success: false, error: err});
     else if (!groups) res.send({ success: true, groups: []});
     else res.send({ success: true, groups: groups });
  });
  
});


route.post('/questions')

route.use('/group', require('./groups'));

module.exports = route;