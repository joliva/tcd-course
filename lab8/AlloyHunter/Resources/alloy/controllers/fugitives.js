function Controller() {
    function __alloyId13() {
        __alloyId13.opts || {};
        var models = filterFugitives(__alloyId12);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId10 = models[i];
            __alloyId10.__transform = {};
            var __alloyId11 = Ti.UI.createTableViewRow({
                font: {
                    fontSize: 18,
                    fontFamily: "Helvetica"
                },
                color: "white",
                title: "undefined" != typeof __alloyId10.__transform["name"] ? __alloyId10.__transform["name"] : __alloyId10.get("name")
            });
            rows.push(__alloyId11);
        }
        $.__views.tblFugitives.setData(rows);
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
    $.__views.__alloyId9 = Ti.UI.createWindow({
        backgroundImage: "grain.png",
        title: "Fugitives",
        id: "__alloyId9"
    });
    $.__views.tblFugitives = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "white",
        id: "tblFugitives"
    });
    $.__views.__alloyId9.add($.__views.tblFugitives);
    var __alloyId12 = Alloy.Collections["people"] || people;
    __alloyId12.on("fetch destroy change add remove reset", __alloyId13);
    $.__views.tabFugitives = Ti.UI.createTab({
        window: $.__views.__alloyId9,
        id: "tabFugitives",
        title: "Fugitives",
        icon: "fugitives.png"
    });
    $.__views.tabFugitives && $.addTopLevelView($.__views.tabFugitives);
    exports.destroy = function() {
        __alloyId12.off("fetch destroy change add remove reset", __alloyId13);
    };
    _.extend($, $.__views);
    $.tblFugitives.addEventListener("click", function(e) {
        var data = {
            name: e.rowData.title,
            captured: false
        };
        var details = Alloy.createController("details", data).getView();
        $.tabFugitives.open(details);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;