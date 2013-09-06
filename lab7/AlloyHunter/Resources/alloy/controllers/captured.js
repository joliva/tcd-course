function Controller() {
    function __alloyId8() {
        __alloyId8.opts || {};
        var models = filterCaptured(__alloyId7);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = {};
            var __alloyId6 = Ti.UI.createTableViewRow({
                color: "white",
                title: "undefined" != typeof __alloyId5.__transform["name"] ? __alloyId5.__transform["name"] : __alloyId5.get("name")
            });
            rows.push(__alloyId6);
        }
        $.__views.__alloyId3.setData(rows);
    }
    function filterCaptured(collection) {
        return collection.where({
            captured: 1
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "captured";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("people");
    $.__views.__alloyId2 = Ti.UI.createWindow({
        backgroundImage: "grain.png",
        title: "Captured",
        id: "__alloyId2"
    });
    $.__views.__alloyId3 = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "white",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    var __alloyId7 = Alloy.Collections["people"] || people;
    __alloyId7.on("fetch destroy change add remove reset", __alloyId8);
    $.__views.captured = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Captured",
        icon: "captured.png",
        id: "captured"
    });
    $.__views.captured && $.addTopLevelView($.__views.captured);
    exports.destroy = function() {
        __alloyId7.off("fetch destroy change add remove reset", __alloyId8);
    };
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;