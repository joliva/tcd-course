var peeps = Alloy.Collections.people;

// only show fugitive people
function filterFugitives(collection) {
	return collection.where({captured:0});
}

$.tblFugitives.addEventListener('click', function(e) {
	var model = peeps.get(e.rowData.alloy_id);
	Ti.API.debug(JSON.stringify(model.toJSON()));
	
	var data = {
		model: peeps.get(e.rowData.alloy_id)
	};
				
	var details = Alloy.createController('details', data).getView();
	$.tabFugitives.open(details);
});
