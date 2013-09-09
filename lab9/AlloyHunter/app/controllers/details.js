var data = arguments[0] || {};
var model = data.model;
var name = model.get('name');
var captured = model.get('captured');
var url = model.get('url');

$.winDetail.title = name;
$.lblHeader.text = captured ? 'Captured' : 'Not Captured';
$.btnCapture.visible = !captured;

if (url !== '') {
	$.imgPeep.setImage(url);
}


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
			
			model.set('url', filepath + filename);
			model.save();
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