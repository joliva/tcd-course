function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "details";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.winDetail = Ti.UI.createWindow({
        backgroundImage: "grain.png",
        id: "winDetail",
        layout: "vertical"
    });
    $.__views.winDetail && $.addTopLevelView($.__views.winDetail);
    $.__views.lblHeader = Ti.UI.createLabel({
        top: "10px",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 20,
            fontFamily: "Helvetica"
        },
        color: "white",
        text: "Not Captured",
        id: "lblHeader"
    });
    $.__views.winDetail.add($.__views.lblHeader);
    $.__views.imgPeep = Ti.UI.createImageView({
        top: "15px",
        image: "/burglar.png",
        height: "150dp",
        id: "imgPeep"
    });
    $.__views.winDetail.add($.__views.imgPeep);
    $.__views.btnAdd = Ti.UI.createButton({
        width: "50%",
        height: Ti.UI.SIZE,
        top: "10px",
        title: "Add Photo",
        id: "btnAdd"
    });
    $.__views.winDetail.add($.__views.btnAdd);
    $.__views.btnDelete = Ti.UI.createButton({
        width: "50%",
        height: Ti.UI.SIZE,
        top: "10px",
        title: "Delete",
        id: "btnDelete"
    });
    $.__views.winDetail.add($.__views.btnDelete);
    $.__views.btnCapture = Ti.UI.createButton({
        width: "50%",
        height: Ti.UI.SIZE,
        top: "10px",
        title: "Capture",
        id: "btnCapture"
    });
    $.__views.winDetail.add($.__views.btnCapture);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var data = arguments[0] || {};
    $.winDetail.title = data.name;
    $.lblHeader.text = data.captured ? "Captured" : "Not Captured";
    $.btnCapture.visible = !data.captured;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;