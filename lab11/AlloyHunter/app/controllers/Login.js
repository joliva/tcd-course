var acs = Alloy.Globals.ACS;

if(acs.isLoggedIn()) {
	// user is logged in so just close this view
	$.logincontainer.hide();
    if (OS_ANDROID) Ti.UI.Android.hideSoftKeyboard();
} else {
	Ti.API.debug('not logged in')
}

// complete this function: If user is valid, hide the logincontainer view.
// otherwise, change the submit button's title to "Try again..." and then back
var createCallback = function(user) {
	if (user) {
		$.logincontainer.hide();
	    if (OS_ANDROID) Ti.UI.Android.hideSoftKeyboard();
	} else {
		$.submit.text - 'Try again...';
	}
};

$.submit.addEventListener('click', function() {
	$.name.blur();
	$.password.blur();
	$.submit.title = 'Working ...';
	
	acs.createUser($.name.value, $.password.value, createCallback);
});
