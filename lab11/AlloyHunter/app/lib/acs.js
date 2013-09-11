/*
	Library to wrap app-specific functionality around the ACS APIs
*/
// a couple local variables to save state
var currentUser = null;
var loggedIn = false;

var Cloud = require('ti.cloud');
Cloud.debug = true;

// Persist the user's login status -- by default, they're
// logged out when the app closes
var sid = Ti.App.Properties.getString('sessionid');
if(sid) {
	Cloud.sessionId = sid;
	loggedIn = true;
	var me = Cloud.Users.showMe(function(e) {
		currentUser = e.users[0];
	});
}

exports.isLoggedIn = function() {
	return loggedIn;
};

// Add createUser() here, accepts username, password, and callback function
// ACS API requires password & confirm, but we do the checking elsewhere so use the same for both here
// API also logs in the user, so make sure to set loggedIn and currentUser appropriately
exports.createUser = function(username, password, callback) {
};

// Add saveFugitive() here, accepts a fugitive object, store the 
// custom object in a class named 'fugitive'
// check logged in state, Ti.API.info() out a success/failure message
exports.saveFugitive = function(fugitive) {
}
