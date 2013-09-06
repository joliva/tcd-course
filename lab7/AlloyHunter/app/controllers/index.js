var people = Alloy.Collections.people;

if (Ti.App.Properties.getBool('seeded', false) == false) {
		
	var url = "http://bountyhunterapp.appspot.com/bounties";
	
	Ti.API.debug('creating client');
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			// parse returned string into JSON
			var peeps = JSON.parse(this.responseText);

			Ti.API.log(peeps);
			_.each(peeps, function(peep) {
				var person = Alloy.createModel('people', {name:peep.name});
				
				if (person.get('name') == 'Don Thorp') {
					person.set('captured', 1);
				}
				
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
}

//free data binding resources when view/controller closes
$.index.addEventListener('close', function() {
	$.destroy();
});

$.index.open();