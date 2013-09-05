function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        barColor: "#6d0a0c",
        id: "index"
    });
    $.__views.fugitiveTab = Alloy.createController("fugitives", {
        id: "fugitiveTab"
    });
    $.__views.index.addTab($.__views.fugitiveTab.getViewEx({
        recurse: true
    }));
    $.__views.capturedTab = Alloy.createController("captured", {
        id: "capturedTab"
    });
    $.__views.index.addTab($.__views.capturedTab.getViewEx({
        recurse: true
    }));
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;