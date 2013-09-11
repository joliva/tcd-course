var acs = require('acs');

if(acs.isLoggedIn()) {
	// user is logged in so just close this view
	$.logincontainer.hide();
} else {
	Ti.API.info('not logged in')
}

// complete this function: If user is valid, hide the logincontainer view.
// otherwise, change the submit button's title to "Try again..." and then back
var createCallback = function(user) {
};

$.submit.addEventListener('click', function() {
	$.name.blur();
	$.password.blur();
	$.submit.title = 'Working ...';
	// call your createUser() function here, passing the correct data
});
