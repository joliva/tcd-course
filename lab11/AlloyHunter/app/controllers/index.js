var people = Alloy.Collections.people;
var acs = Alloy.Globals.ACS;

function init_from_db() {
	if (Ti.App.Properties.getBool('seeded', false) == false) {
		var url = "http://bountyhunterapp.appspot.com/bounties";
		
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				// parse returned string into JSON
				var peeps = JSON.parse(this.responseText);
	
				Ti.API.log(peeps);
				_.each(peeps, function(peep) {
					var person = Alloy.createModel('people', {name:peep.name});
					
					people.add(person);
					person.save();
				});
	
				Ti.App.Properties.setBool('seeded', true);
				
				//trigger synchronization
				people.fetch();
			},
			
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.debug(e.error);
			},
			
			timeout : 5000  // in milliseconds
		});
		
		// Prepare the connection.
		client.open("GET", url);
		
		// Send the request.
		client.send();
	} else {
		//trigger synchronization
		people.fetch();
	}
}

function init_from_acs(user) {
	// wipe local db
	people.fetch();
	while (people.length > 0) {
		people.at(0).destroy();
	}
	
	// query ACS to get all people
	acs.getFugitives(user, function(e) {
		if (e) {
			// initialize collection from query results
			_.each(e.fugitive, function(peep) {
				var person = Alloy.createModel('people', {
					name: peep.name,
					captured: peep.captured,
					url: peep.url,
					capturedLat: peep.capturedLat,
					capturedLon: peep.capturedLon,
					acs_id: peep.id,
					url: peep.url,
					url: peep.url,
					url: peep.url,
				});
				
				people.add(person);
				person.save();
			});
		} else {
			TI.API.debug('no data from getFugitives()');
		}
	});
}

Ti.App.addEventListener('got_user', function() {
	// call either of these to initialize
	
	init_from_acs(Alloy.Globals.user);
	//init_from_db();
});


if (OS_ANDROID) {
	$.index.addEventListener("open", function(e) {
	    var activity = $.index.activity;
		activity.onCreateOptionsMenu = function(e) {
			var menuItem = e.menu.add({
				title : "Add Fugitive",
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
				icon : "add_icon.png"
			});

			menuItem.addEventListener("click", function(e) {
			    var addFugitiveController = Alloy.createController('FugitiveAdd');
			    Alloy.Globals.tabFugitives.open(addFugitiveController.getView());
			});
		};

		activity.invalidateOptionsMenu();
	});
}

// free data binding resources when view/controller closes
$.index.addEventListener('close', function() {
	$.destroy();
});

$.index.open();