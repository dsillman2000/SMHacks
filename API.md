#Specifications for the REST API that drives Socratik

##Account API
###POST /account/register
Register for a new account
Parameters:
email - string - user's email
username - string - user's requested username
password - string - user's requested password
Response:
{
    success: boolean,
    accountID: user's assigned ID,
    error: if success false, type of error (usernametaken, invalidusername, emailtaken, invalidemail),
}

###POST /account/login
Authenticate existing account
Parameters:
username - string - user's email or username
password - string - user's password
Response:
{
    success: boolean,
    accountID: users's assigned ID,
    session: session string,
    error: if success false, type of error (nosuchuser, invalidpassword)
}

###POST /account/update/accountID
Update account details
TODO

###POST /acccount/info/accountID
Get info for given account or own account
Parameters:
accountID: ID of account to get info for,
session: session string
Response:
{
    success: true,
    error: if success false, which error (nosuchuser)
    username: username of account,
    email: email of account,
    desc: description of account,
    image: imageURL for the account
}



##Group API
###POST /group/join/groupID
Join a given group

###POST /group/create
Create a group (if allowed)

###POST /group/info/groupID
Get info for given group

###POST /group/update/groupID
Update a given group

###POST /group/remove/groupID
Remove a given group

###POST /group/list/userID
Get available groups for a given user



##Question API
###POST /question/new
Ask a question

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