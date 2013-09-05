function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "fugitives";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId2 = Ti.UI.createWindow({
        backgroundImage: "grain.png",
        title: "Fugitives",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "white",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.fugitives = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Fugitives",
        icon: "fugitives.png",
        id: "fugitives"
    });
    $.__views.fugitives && $.addTopLevelView($.__views.fugitives);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;