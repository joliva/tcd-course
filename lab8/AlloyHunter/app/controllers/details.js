var data = arguments[0] || {};
$.winDetail.title = data.name;

$.lblHeader.text = data.captured ? 'Captured' : 'Not Captured';
$.btnCapture.visible = !data.captured;

var guts = {
	success:function(event) {
		// called when media returned
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
			setImage(event.media);
		} else {
			Ti.API.debug("unsupported media type = "+event.mediaType);
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