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

var addMemberToGroup = function(req, res, groupId, userId) {
  //Find group first
  Group.findById(groupId, function(err, group) {
      if (err) res.json({ success: false, error: err });
      else if (!group) res.json({ success: false, error: "Group not found" });
      else {
        
        console.log("found group");
        console.log(group.members);
        console.log("comparing to " + userId);
        //Check that the user is not already in the group
        var containsUser = false;
        for (var i = 0; i < group.members.length; i++) {
          if (group.members[i].id == userId) {
            containsUser = true;
            break;
          }
        }
        
        if (containsUser) res.json({ success: false, error: "Already in group" });
        else {
          //If user is not present, add him to list of members
          Group.findByIdAndUpdate(req.params.groupId, {
            $push: {"members":  { //addToSet key prevents duplicates 
              		id: userId,
              		email: req.user.email,
              		firstname: req.user.firstname,
              		lastname: req.user.lastname
            }}}, function(err, group) {
              if (err) res.json({ success: false, error: err });
              else if (!group) res.json({ success: false, error: "Group not found somehow" });
              else res.json({ success: true });
            });
        }
      }
  });
};

route.post('/group/:groupId/addmember', function(req, res) {
  
  if (!req.body.email) return;
  
  User.findOne({'email': req.body.email}, function(err, user) {
    if (err) res.json({ success: false, error: err });
    else if (!user) res.json({ success: false, error: "User not found" });
    else {
      
      addMemberToGroup(req, res, req.params.groupId, user.id);
//      
//      Group.findByIdAndUpdate(
//        req.params.groupId,
//        {$addToSet: {"members": {
//      		id: user.id,
//      		email: user.email,
//      		firstname: user.firstname,
//      		lastname: user.lastname
//      	}}},
//        {safe: true, upsert: true}, 
//        function(err, group) {
//          if (err) res.json({ success: false, error: err });
//          else if (!group) res.json({ success: false, error: "Group not found" });
//          else res.json({ success: true });
//      });
//      
    }
  
  });
});

route.post('/group/:groupId/join', function(req, res) {
  
  addMemberToGroup(req, res, req.params.groupId, req.user.id);
  
//  //Find group first
//  Group.findById(req.params.groupId, function(err, group) {
//      if (err) res.json({ success: false, error: err });
//      else if (!group) res.json({ success: false, error: "Group not found" });
//      else {
//        
//        console.log("found group");
//        console.log(group.members);
//        console.log("comparing to " + req.user.id);
//        //Check that the user is not already in the group
//        var containsUser = false;
//        for (var i = 0; i < group.members.length; i++) {
//          if (group.members[i].id == req.user.id) {
//            containsUser = true;
//            break;
//          }
//        }
//        
//        if (containsUser) res.json({ success: false, error: "Already in group" });
//        else {
//          //If user is not present, add him to list of members
//          Group.findByIdAndUpdate(req.params.groupId, {
//            $push: {"members":  { //addToSet key prevents duplicates 
//              		id: req.user.id,
//              		email: req.user.email,
//              		firstname: req.user.firstname,
//              		lastname: req.user.lastname
//            }}}, function(err, group) {
//              if (err) res.json({ success: false, error: err });
//              else if (!group) res.json({ success: false, error: "Group not found somehow" });
//              else res.json({ success: true });
//            });
//        }
//      }
//  });
  
});



//route.get('/creategroup', function(req, res) {
//  console.log('user: ' + JSON.stringify(req.user));
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
  
//}); 

module.exports = route;