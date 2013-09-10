var peeps = Alloy.Collections.people;

// only show captured people
function filterCaptured(collection) {
	return collection.where({captured:1});
}

$.tblCaptured.addEventListener('click', function(e){
	var data = {
		parentTab: $.tabCaptured,
		model: peeps.get(e.rowData.alloy_id)
	};
	
	var details = Alloy.createController('details', data).getView();
	$.tabCaptured.open(details);
});