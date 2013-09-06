// only show captured people
function filterCaptured(collection) {
	return collection.where({captured:1});
}

$.tblCaptured.addEventListener('click', function(e){
	var data = {
		name: e.rowData.title,
		captured: true
	};
	var details = Alloy.createController('details', data).getView();
	$.tabCaptured.open(details);
});