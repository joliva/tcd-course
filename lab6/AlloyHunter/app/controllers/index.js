var people = Alloy.Collections.people;

if (Ti.App.Properties.getBool('seeded', false) == false) {
	Ti.App.Properties.setBool('seeded', true);
	
	alert('Seeding collection');
	
	var peeps = ['Jeff Haynie','Nolan Wright','Blain Hamon','Aaron Saunders','Anthony Decena'];
	_.each(peeps, function(name) {
		var person = Alloy.createModel('people', {name:name});
		
		if (person.get('name') == 'Aaron Saunders') {
			person.set('captured', 1);
		}
		
		people.add(person);
		person.save();
	});
}

//trigger synchronization
people.fetch();

//free data binding resources when view/controller closes
$.index.addEventListener('close', function() {
	$.destroy();
});

$.index.open();