function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "captured";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId0 = Ti.UI.createWindow({
        backgroundImage: "grain.png",
        title: "Captured",
        id: "__alloyId0"
    });
    $.__views.__alloyId1 = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "white",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.captured = Ti.UI.createTab({
        window: $.__views.__alloyId0,
        title: "Captured",
        icon: "captured.png",
        id: "captured"
    });
    $.__views.captured && $.addTopLevelView($.__views.captured);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;