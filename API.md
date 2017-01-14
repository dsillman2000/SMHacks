#Specifications for the REST API that drives Socratik

##Account API
###POST /account/register
Register for a new account

###POST /account/login
Authenticate existing account

###POST /account/update
Update account details

###POST /acccount/info/accountID
Get info for given account or own account



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