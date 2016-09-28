# phantom_back_end

This is the source code for the API associated with the game Phantom, created by Michael Mesereau.

For current features, there are three endpoints.

POST /win: https://mmesereau-phantom.herokuapp.com/win, ({nickname: *nickname*}) (body required)
If the nickname already exists, this updates the user to have one additional win.
If the nickname does not exist, this initializes a new user with that nickname and an all-time record of 1-0.

POST /loss: https://mmesereau-phantom.herokuapp.com/loss, ({nickname: *nickname*}) (body required)
If the nickname already exists, this updates the user to have one additional loss.
If the nickname does not exist, this initializes a new user with that nickname and an all-time record of 0-1.

GET /leaders: https://mmesereau-phantom.herokuapp.com/leaders
Returns all users.  The front end then initializes a leaderboard (sorted one of three ways) and limits the visible leaders.

For upcoming features, there are additional endpoints:

LOGIN AND REGISTRATION:

POST /register: https://mmesereau-phantom.herokuapp.com/register, ({username: *username*, nickname: *nickname*, password: *password*}) (body required)
If the username does not exist, this route initializes a new user with the given information and a 0-0 win-loss record, then returns a JSON Web Token.
If the username exists, this route returns an error.
The source code exists for front end registration at this time, but there are no current features that require a user to be registered or logged in.

POST /login: https://mmesereau-phantom.herokuapp.com/login, ({username: *username*, password: *password*}) (body required)
If the username exists, this route validates the password and username.  If the username and password are validated, this route returns a JSON Web Token with all the user information except password.
If the username and password are not validated, or if the username does not exist, this route returns an error which is read by the front end.
The source code exists for front end login at this time, but there are no current features that require a user to be registered or logged in.

MULTIPLAYER: 
These endpoints are for when the front end has multi-browser capability.

GET /multiplayer: https://mmesereau-phantom.herokuapp.com/multiplayer
Returns all multi-browser games that have yet to be started, and all players that have signed up for each of those games.

POST /multiplayer: https://mmesereau-phantom.herokuapp.com/multiplayer ({name: *name*, id: *id*}) (body required)
This creates a new multi-browser game that has not begun, with the players_id (*id*) of the player who initialized it and the name of the game.
A user must be logged in so that the *id* exists.
This route also automatically signs up the player who initialized the game.

POST /multiplayer/join: https://mmesereau-phantom.herokuapp.com/multiplayer/join ({games_id: *games_id*, users_id: *users_id*})
This route allows a player to join a multi-browser game that has not begun.  A user must be logged in so that *users_id* exists.


