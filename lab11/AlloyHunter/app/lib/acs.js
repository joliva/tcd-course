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
	Cloud.Users.create({
	    username: username,
	    password: password,
	    password_confirmation: password
	}, function (e) {
	    if (e.success) {
	        var currentUser = e.users[0];
	        Ti.API.debug('login success:\n' +
	            'id: ' + currentUser.id + '\n' +
	            'sessionId: ' + Cloud.sessionId + '\n' +
	            'username: ' + currentUser.username
	        );
	        
	        loggedIn = true;
	        
	        // save sessionID
	        Ti.App.Properties.setString('sessionid', Cloud.sessionId);
	        
	        callback(currentUser);
	    } else {
	        Ti.API.error('login error:\n' +  ((e.error && e.message) || JSON.stringify(e)));
	        alert('Login error: ' + ((e.error && e.message) || JSON.stringify(e)))
	        
	        currentUser = null;
	        loggedIn = false;
	        
	        callback(false);
	    }
	});
};

// Add saveFugitive() here, accepts a fugitive object, store the 
// custom object in a class named 'fugitive'
// check logged in state, Ti.API.info() out a success/failure message
exports.saveFugitive = function(fugitive, callback) {
	if (loggedIn === true) {
		Cloud.Objects.update ({
		    classname: 'fugitive',
		    id: fugitive.acs_id,
		    fields: {
				'name': fugitive.name,
				'captured': fugitive.captured,
				'url': fugitive.url,
				'capturedLat': fugitive.capturedLat,
				'capturedLon': fugitive.capturedLon
		    }
		}, function (e) {
		    if (e.success) {
		        var fugitive = e.fugitive[0];
		        Ti.API.debug('save fugitive success:\n' +
			        'id: ' + fugitive.id + '\n' +
			        'name: ' + fugitive.name + '\n' +
		            'captured: ' + fugitive.captured + '\n' +
		            'url: ' + fugitive.url + '\n' +
		            'capturedLat: ' + fugitive.capturedLat + '\n' +
		            'capturedLon: ' + fugitive.capturedLon + '\n' +
		            'created_at: ' + fugitive.created_at
		        );
		        
		        if (callback) callback(true);
		    } else {
		        Ti.API.error('save fugitive error: ' + ((e.error && e.message) || JSON.stringify(e)));
		        alert('Save fugitive error: ' + ((e.error && e.message) || JSON.stringify(e)))
		        
		        if (callback) callback(false);
		    }
		});
	} else {
		Ti.API.debug('updating fugitive - must be logged in');
		alert ('Must be logged in');	}
}

exports.createFugitive = function(fugitive, callback) {
	if (loggedIn === true) {
		Cloud.Objects.create ({
		    classname: 'fugitive',
		    fields: {
				'name': fugitive.name,
				'captured': fugitive.captured,
				'url': fugitive.url,
				'capturedLat': fugitive.capturedLat,
				'capturedLon': fugitive.capturedLon
		    }
		}, function (e) {
		    if (e.success) {
		        var fugitive = e.fugitive[0];
		        Ti.API.debug('create fugitive success:\n' +
			        'id: ' + fugitive.id + '\n' +
			        'name: ' + fugitive.name + '\n' +
		            'captured: ' + fugitive.captured + '\n' +
		            'url: ' + fugitive.url + '\n' +
		            'capturedLat: ' + fugitive.capturedLat + '\n' +
		            'capturedLon: ' + fugitive.capturedLon + '\n' +
		            'created_at: ' + fugitive.created_at
		        );
		        
		        if (callback) callback(fugitive);
		    } else {
		        Ti.API.error('create fugitive error: ' + ((e.error && e.message) || JSON.stringify(e)));
		        alert('Create fugitive error: ' + ((e.error && e.message) || JSON.stringify(e)))
		        
		        if (callback) callback(false);
		    }
		});
	} else {
		Ti.API.debug('creating fugitive - must be logged in');
		alert ('Must be logged in');
	}
}

exports.deleteFugitive = function(fugitive, callback) {
	if (loggedIn === true) {
		Cloud.Objects.remove ({
		    classname: 'fugitive',
		    id: fugitive.acs_id
		}, function (e) {
		    if (e.success) {
		        Ti.API.debug('delete fugitive success');
		        if (callback) callback(true);
		    } else {
		        Ti.API.error('delete fugitive error: ' + ((e.error && e.message) || JSON.stringify(e)));
		        alert('Delete fugitive error: ' + ((e.error && e.message) || JSON.stringify(e)))
		        if (callback) callback(false);
		    }
		});
	} else {
		Ti.API.debug('deleting fugitive - must be logged in');
		alert ('Must be logged in');
	}
}