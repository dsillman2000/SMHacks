var route = require('express').Router();

var auth = function(req, res, next){
  if (!req.isAuthenticated())
  	res.sendStatus(401);
  else
  	next();
};

route.get('/', function(req, res) {
  res.json({ success: true });
});

route.get('/apicall/:key', function(req, res) {
	// res.send('api called successfully key is ' + req.params.key);

	res.json({ success: true });

});


module.exports = route;