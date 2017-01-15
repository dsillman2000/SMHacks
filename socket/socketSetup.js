var Question = require('../db/models/question');

var recieveMessage = function(message, roomId, userId, io) {
	
	var newComment = { 
  		comment: message,
		date: Date.now(),
  		userId: userId
    }
	
	Question.findByIdAndUpdate(roomId, {
	    $push: {"comments":  newComment}}, function(err, question) {
//	      if (err) res.json({ success: false, error: err });
//	      else if (!group) res.json({ success: false, error: "Group not found somehow" });
//	      else res.json({ success: true });

		if (question) {
			io.to(roomId).emit('message', {
				message: message,
				date: Date.now(),
				userId: userId
			});
		}

	    });
	
	
	
	
	
		
};



module.exports = function(io, session, passport) {
	
	
	io.use(function(socket, next) {
		session(socket.request, {}, next);
	})
	.on('connection', function(socket) {
		
		if (!socket.request.session.passport) {
			socket.emit('logout', '');
			return;
		}
		
	    
		var userId = socket.request.session.passport.user;
		if (userId && passport.authenticate(userId)) {
//			sendRecentMessages(socket);
//			sendChatList(socket);
//			sendChatInfo(socket);
		} else {
			socket.emit('logout', '');
			return;
		}

		socket.emit('init');
		
		socket.on('mygroup', function(group) {
			socket.join(group);
		});
	    
	    socket.on('chat message', function(msg, chatRoomId) {
			
			console.log('new message: ' + msg + ' to group ' + chatRoomId);
			
			socket.request.session.touch();
			
			var userId = socket.request.session.passport.user;
			if (userId && passport.authenticate(userId)) {
				
				recieveMessage(msg, chatRoomId, userId, io);
				
			} else {
				socket.emit('logout', '');
			}
		});
	});
};