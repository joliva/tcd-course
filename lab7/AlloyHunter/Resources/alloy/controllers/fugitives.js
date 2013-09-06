function Controller() {
    function __alloyId17() {
        __alloyId17.opts || {};
        var models = filterFugitives(__alloyId16);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId14 = models[i];
            __alloyId14.__transform = {};
            var __alloyId15 = Ti.UI.createTableViewRow({
                color: "white",
                title: "undefined" != typeof __alloyId14.__transform["name"] ? __alloyId14.__transform["name"] : __alloyId14.get("name")
            });
            rows.push(__alloyId15);
        }
        $.__views.__alloyId12.setData(rows);
    }
    function filterFugitives(collection) {
        return collection.where({
            captured: 0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "fugitives";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("people");
    $.__views.__alloyId11 = Ti.UI.createWindow({
        backgroundImage: "grain.png",
        title: "Fugitives",
        id: "__alloyId11"
    });
    $.__views.__alloyId12 = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "white",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    var __alloyId16 = Alloy.Collections["people"] || people;
    __alloyId16.on("fetch destroy change add remove reset", __alloyId17);
    $.__views.fugitives = Ti.UI.createTab({
        window: $.__views.__alloyId11,
        title: "Fugitives",
        icon: "fugitives.png",
        id: "fugitives"
    });
    $.__views.fugitives && $.addTopLevelView($.__views.fugitives);
    exports.destroy = function() {
        __alloyId16.off("fetch destroy change add remove reset", __alloyId17);
    };
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;