var data = arguments[0] || {};
var acs = Alloy.Globals.ACS;

var parentTab = data.parentTab;
var model = data.model;

var name = model.get('name');
var captured = model.get('captured');
var url = model.get('url');

$.winDetail.title = name;

Ti.API.debug(JSON.stringify(model.toJSON()));

function updateView() {
	$.lblHeader.text = (captured==1) ? 'Captured' : 'Not Captured';
	$.btnExtra.title = (captured==1) ? 'View on Map' : 'Capture';
	
	if (url !== '') {
		$.imgPeep.setImage(url);
	}
}

updateView();

var guts = {
	success:function(event) {
		// called when media returned
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
			setImage(event.media);
			
			var filepath = Ti.Filesystem.applicationDataDirectory;
			var filename = 'photo-' + model.get('alloy_id') + '.png';
			Ti.API.debug('saving photo to: ' + filepath + filename);
			
			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,filename);
			f.write(event.media); // write to the file
			
			var model_saved = model.toJSON();
			model.set('url', filepath + filename);
			
		    // update model in ACS
		    acs.saveFugitive(model.toJSON(), function(e) {
		    	if (e) {
		    		// success
		    		
		    	    // save model
		    	    model.save();

		    	    // force tables to update
		    	    Alloy.Collections.people.fetch();    		
		    	} else {
		    		// revert on failure
		    		model.set(model_saved);
		    	}
		    });
		} else {
			Ti.API.debug("unsupported media type = " + event.mediaType);
		}
	},
	cancel:function() {
		// called when user cancels
		Ti.API.debug("add photo - canceled");
	},
	error:function(error) {
		// called when there's an error
		Ti.API.debug("error adding photo: " + error.code);
	},
	animated:true,
	saveToPhotoGallery:false,
	allowEditing:false,
	autohide:true,
	mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
};

function setImage(image) {
	$.imgPeep.image = image;
}

function handleCamera(options) {
	Ti.Media.showCamera(options);
}

function handleGallery(options) {
	Ti.Media.openPhotoGallery(options);
}

$.btnAdd.addEventListener('click', function() {
	var img;
	
	if (ENV_DEV) {
		// simulator/emulator - pick from photo gallery
		handleGallery(guts);
	} else {
		// device - use camera if available, otherwise photo gallery
		if (Ti.Media.isCameraSupported == true) {
			handleCamera(guts);
		} else {
			handleGallery(guts);
		}
	}
});

$.btnExtra.addEventListener('click', function(e) {	
	if (captured == 0) {
		// set up geolocation settings
		if (Ti.Geolocation.getLocationServicesEnabled() == true) {
			if (OS_IOS) {
				Ti.Geolocation.setPurpose('Tracking down criminal scum.');
				Ti.Geolocation.setAccuracy(Ti.Geolocation.ACCURACY_BEST);
			}
				
			if (OS_ANDROID) {
				Ti.Geolocation.setAccuracy(Ti.Geolocation.ACCURACY_HIGH);
			}

		} else {
			alert ('Geolocation is not available');
			return;
		}
				
		// get lat/lon
		Ti.Geolocation.getCurrentPosition(function(e) {
			Ti.API.debug('results info:  ' + JSON.stringify(e));
			
			var model_saved = model.toJSON();
			
			if (e.success) {
				model.set('capturedLat', e.coords.latitude);
				model.set('capturedLon', e.coords.longitude);
				model.set('captured', 1);
			} else {
				Ti.API.debug('Error getting location: ' + e.error);
				if (OS_ANDROID && ENV_DEV) alert('Make sure location is set in emulator');
				return;
			}

		    // update model in ACS
		    acs.saveFugitive(model.toJSON(), function(e) {
		    	if (e) {
		    		// success
		    		
		    	    // save model
					model.save({},{
						success: function(model, resp, options) {
							alert ('Fugitive captured!');
							
							Alloy.Collections.people.fetch();	// need to update table views
							
							if (OS_IOS) $.winDetail.close();
							
							if (OS_ANDROID) setTimeout(function() {
								$.winDetail.close();
							}, 2000);
							
							Ti.API.debug(JSON.stringify(model.toJSON()));
						},
						failure: function() {
				    		// revert on failure
				    		model.set(model_saved);
						}
					});   		
		    	} else {
		    		// revert on failure
		    		model.set(model_saved);
		    	}
		    });
		});
	} else {
		// show them on map
		var data = {
			model: model
		};
						
		var map = Alloy.createController('map', data).getView();
		parentTab.open(map);
	}
});

