var peeps = Alloy.Collections.people;

Alloy.Globals.tabFugitives = $.tabFugitives;

if (Ti.Platform.osname === 'iphone') {
	 $.add.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
	 $.add.addEventListener('click', addNewFugitive);
	 $.winFugitive.setRightNavButton($.add);
}

// only show fugitive people
function filterFugitives(collection) {
	return collection.where({captured:0});
}

$.tblFugitives.addEventListener('click', function(e) {
	var model = peeps.get(e.rowData.alloy_id);
	
	var data = {
		parentTab: $.tabFugitives,
		model: peeps.get(e.rowData.alloy_id)
	};
				
	var details = Alloy.createController('details', data).getView();
	$.tabFugitives.open(details);
});

function addNewFugitive() {
    var addFugitiveController = Alloy.createController('FugitiveAdd');
    $.tabFugitives.open(addFugitiveController.getView());
}
