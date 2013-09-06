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
    var people = Alloy.Collections.people;
    if (false == Ti.App.Properties.getBool("seeded", false)) {
        Ti.API.debug("Seeding collection");
        var url = "http://bountyhunterapp.appspot.com/bounties";
        Ti.API.debug("creating client");
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.debug("in onload");
                var peeps = JSON.parse(this.responseText);
                Ti.API.debug("peeps:");
                Ti.API.log(peeps);
                _.each(peeps, function(peep) {
                    var person = Alloy.createModel("people", {
                        name: peep.name
                    });
                    "Don Thorp" == person.get("name") && person.set("captured", 1);
                    people.add(person);
                    person.save();
                });
                Ti.App.Properties.setBool("seeded", true);
                people.fetch();
            },
            onerror: function(e) {
                Ti.API.debug("in onerror");
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        Ti.API.debug("sending request");
        client.send();
    }
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;