var acs = Alloy.Globals.ACS;

//
// this is setting the view elements of the row view
// which is found in views/row.xml based on the arguments
// passed into the controller
//

//
// EVENT HANDLER
//
$.save_button.addEventListener('click', function(_e) {

    var fugitiveModel = Alloy.createModel("people", {
        name : $.name_tf.value
    });
    
    // save to ACS
    acs.createFugitive(fugitiveModel.toJSON(), function(e) {
    	if (e) {
    		// success
    		
    		fugitiveModel.set('acs_id', e.id);

    	    // save model
    	    fugitiveModel.save();

    	    // force tables to update
    	    Alloy.Collections.people.fetch();    		
    	} else {
    		fugitiveModel.destroy();
    	}
    });

    // close window
    $.fugitiveAddWindow.close()
});
