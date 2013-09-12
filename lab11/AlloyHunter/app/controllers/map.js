var data = arguments[0] || {};

var parentTab = data.parentTab;
var model = data.model;

var name = model.get('name');
var url = model.get('url');
var lat = model.get('capturedLat');
var lon = model.get('capturedLon');

if (OS_ANDROID) {
	MapModule = Alloy.Globals.Map;

	var rc = MapModule.isGooglePlayServicesAvailable()
	switch (rc) {
	    case MapModule.SUCCESS:
	        Ti.API.info('Google Play services is installed.');
	        break;
	    case MapModule.SERVICE_MISSING:
	        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
	        break;
	    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
	        alert('Google Play services is out of date. Please update Google Play services.');
	        break;
	    case MapModule.SERVICE_DISABLED:
	        alert('Google Play services is disabled. Please enable Google Play services.');
	        break;
	    case MapModule.SERVICE_INVALID:
	        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
	        break;
	    default:
	        alert('Unknown error checking for Google Play services.');
	        break;
	}
}

$.mapView.setRegion({
	latitude:lat,
	latitudeDelta:.1,
	longitude:lon,
	longitudeDelta:.1
});

var ann = {
	latitude: lat,
	longitude: lon,
	title: name,
	subtitle: 'busted',
	animate: true
};

if (OS_IOS) {
	ann.pincolor = Ti.Map.ANNOTATION_GREEN;
	ann.leftView = Ti.UI.createButton({
		height:'30dp',
		width:'30dp',
		backgroundImage: url
	});
	
	$.mapView.addAnnotation(Ti.Map.createAnnotation(ann));
}

if (OS_ANDROID) {
	ann.pincolor = MapModule.ANNOTATION_GREEN;
	$.mapView.addAnnotation(MapModule.createAnnotation(ann));
}

