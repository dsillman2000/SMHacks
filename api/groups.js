var User = require('../db/models/user');
var Group = require('../db/models/group');
var Question = require('../db/models/question');

var route = require('express').Router();

route.post('/create', function(req, res) {
  
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
    else res.json({ success: true, id: newGroup.id});
  });
});

var addMemberToGroup = function(req, res, groupId, user) {
  //Find group first
  Group.findById(groupId, function(err, group) {
      if (err) res.json({ success: false, error: err });
      else if (!group) res.json({ success: false, error: "Group not found" });
      else {
        
        console.log("found group");
        console.log(group.members);
        console.log("comparing to " + user.id);
        //Check that the user is not already in the group
        var containsUser = false;
        for (var i = 0; i < group.members.length; i++) {
          if (group.members[i].id == user.id) {
            containsUser = true;
            break;
          }
        }
        
        if (containsUser) res.json({ success: false, error: "Already in group" });
        else {
          //If user is not present, add him to list of members

            Group.findByIdAndUpdate(req.params.groupId, {
            $push: {"members":  { //addToSet key prevents duplicates 
              		id: user.id,
              		email: user.email,
              		firstname: user.firstname,
              		lastname: user.lastname
            }}}, function(err, group) {
              if (err) res.json({ success: false, error: err });
              else if (!group) res.json({ success: false, error: "Group not found somehow" });
              else res.json({ success: true });
            });
          
        }
      }
  });
};

route.post('/:groupId/addmember', function(req, res) {
  
  if (!req.body.email) return;
  
  User.findOne({'email': req.body.email}, function(err, user) {
    if (err) res.json({ success: false, error: err });
    else if (!user) res.json({ success: false, error: "User not found" });
    else {
      addMemberToGroup(req, res, req.params.groupId, user);
    }
  
  });
});

route.post('/:groupId/join', function(req, res) {
  
  addMemberToGroup(req, res, req.params.groupId, req.user);
  
});

route.post('/:groupId/questions', function(req, res) {
  
  Question.find({ 'groupId': req.params.groupId }, function(err, questions) {
    if (err) res.json({ success: false, error: err });
    else res.json({ success: false, questions: questions, error: err });
  });
  
});

route.post('/:groupId/info', function(req, res) {
  
  Group.findById(req.params.groupId, function(err, group) {
    if (err) res.json({ success: false, error: err });
    else res.json({ success: true, group: group, error: err });
  });
  
});

route.post('/:groupId/questions/create', function(req, res) {
  
  if (!req.body.question || !req.body.description) res.json({ success: false, error: "Pleave provide a question" });
  
  var newQuestion = Question({
  	groupId: req.params.groupId,
  	question: req.body.question,
    description: req.body.description,
  	user: {
  		userId: req.user.id,
  		firstname: req.user.firstname,
  		lastname: req.user.lastname
  	},
  	date: Date.now(),
  	comments: []
  });
  
  newQuestion.save(function(err) {
    if (err) res.json({ success: false, error: err });
    else {
      console.log("[User] created question");
      res.json({ success: true, id: newQuestion.id, error: err });
    }
  });
  
});

module.exports = route;