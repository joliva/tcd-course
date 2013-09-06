function Controller() {
    function __alloyId6() {
        __alloyId6.opts || {};
        var models = filterCaptured(__alloyId5);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId3 = models[i];
            __alloyId3.__transform = {};
            var __alloyId4 = Ti.UI.createTableViewRow({
                font: {
                    fontSize: 18,
                    fontFamily: "Helvetica"
                },
                color: "white",
                title: "undefined" != typeof __alloyId3.__transform["name"] ? __alloyId3.__transform["name"] : __alloyId3.get("name")
            });
            rows.push(__alloyId4);
        }
        $.__views.tblCaptured.setData(rows);
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
    $.__views.tblCaptured = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "white",
        id: "tblCaptured"
    });
    $.__views.__alloyId2.add($.__views.tblCaptured);
    var __alloyId5 = Alloy.Collections["people"] || people;
    __alloyId5.on("fetch destroy change add remove reset", __alloyId6);
    $.__views.tabCaptured = Ti.UI.createTab({
        window: $.__views.__alloyId2,
        id: "tabCaptured",
        title: "Captured",
        icon: "captured.png"
    });
    $.__views.tabCaptured && $.addTopLevelView($.__views.tabCaptured);
    exports.destroy = function() {
        __alloyId5.off("fetch destroy change add remove reset", __alloyId6);
    };
    _.extend($, $.__views);
    $.tblCaptured.addEventListener("click", function(e) {
        var data = {
            name: e.rowData.title,
            captured: true
        };
        var details = Alloy.createController("details", data).getView();
        $.tabCaptured.open(details);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;