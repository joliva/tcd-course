// only show fugitive people
function filterFugitives(collection) {
	return collection.where({captured:0});
}

$.tblFugitives.addEventListener('click', function(e){
	var data = {
		name: e.rowData.title,
		captured: false
	};
	var details = Alloy.createController('details', data).getView();
	$.tabFugitives.open(details);
});
