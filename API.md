#Specifications for the REST API that drives Socratik
Everything is behind /api/v1

##Account API
###User object
{  
    id: String,  
    firstname: string,  
    lastname: string,  
    password: string (hash)  
}  

###POST /account/register
Register for a new account  
Parameters:  
email - string - user's email  
firstname - string - user's first name  
lastname - string - user's last name  
password - string - user's requested password  
Response:  
{  
    success: boolean,  
    id: user's assigned ID,  
    error: if success false, type of error (usernametaken, invalidusername, emailtaken, invalidemail),  
}  

###POST /account/login
Authenticate existing account  
Parameters:  
email - string - user's email  
password - string - user's password  
Response:  
{  
    success: boolean,  
    id: users's assigned ID,
    groups: [Group Object]
    error: if success false, type of error (nosuchuser, invalidpassword)  
}  

###POST /account/update/accountID
Update account details  
TODO  

###POST /acccount/info/accountID
Get info for given account or own account  
Parameters:  
accountID: ID of account to get info for,  
Response:  
{  
    success: true,  
    error: if success false, which error (nosuchuser)  
    userobject: userobject corresponding to given id  
}  

###POST /account/loggedin
Response {
    success: true/false
}



##Group API
###Group object
{  
    id: String,  
    name: String,
	description: String,
	members: [{
		id: String,
		email: String,
		firstname: String,
		lastname: String
	}],
	admins: [String], //Strings are IDs, admins are also in members list
	questions: [{
		id: String,
		question: String
	}]
}

###POST /group/groupID/join
Join a given group
Response:  
{  
    success: boolean,  
    group: Group Object 
    error: if success false, type of error (usernametaken, invalidusername, emailtaken, invalidemail),  
}

###POST /group/create
Create a new group
Parameters:
name: String,
description: String
Response:  
{  
    success: boolean,  
    id: group's assigned ID,  
    error: if success false, type of error (usernametaken, invalidusername, emailtaken, invalidemail),  
}

###POST /group/groupID/addmember
Add a user to a given group
Parameters:
email: String
Response:
{  
    success: boolean,  
    error: if success false, type of error (usernametaken, invalidusername, emailtaken, invalidemail),  
}

###POST /group/groupID/info/
- Group Object
TODO

###POST /group/groupID/update
Update a given group
TODO

###POST /group/groupID/remove
Remove a given group
TODO

###POST /group/list/userID
Get available groups for a given user
TODO

##Question API
###Question Object
{
	groupId: String,
	question: String,
	user: {
		userId: String,
		firstName: String,
		lastName: String
	},
	date: Number,
	comments: [{
		comment: String,
		date: Number,
		userId: String,
		firstName: String,
		lastName: String
	}]
}

###POST /group/groupID/questions/
Response:
{  
    success: boolean,  
    questions: [Question Object],  
    error: if success false, type of error (usernametaken, invalidusername, emailtaken, invalidemail),  
}


###POST /group/groupID/questions/new
Create a new question
Parameters:
question: String
Response:
{  
    success: boolean,  
    id: question's assigned ID,  
    error: if success false, type of error (usernametaken, invalidusername, emailtaken, invalidemail),  
}

###POST /question/update
Update a question

###POST /question/info/questionID
Get info about a question

###POST /question/list/groupID
List questions in a given group

###POST /question/response/new/questionID
Answer a given question

###POST /question/response/update/responseID
Update a previous answer

###POST /question/response/info/responseID
Get info about a particular response

###POST /question/response/list/questionID
Get responses for a given question



##Active Seminar API
###POST /seminar/create
Createa a new active seminar

###POST /seminar/info/seminarID
Get info about an existing active seminar

###POST /seminar/update/seminarID
Update info about an existing active seminar

###POST /seminar/close/seminarID
Close a given seminar

###POST /seminar/join/seminarID
Add user to an existing active seminar

###POST /seminar/list/groupID
Get a list of active seminars in a given group