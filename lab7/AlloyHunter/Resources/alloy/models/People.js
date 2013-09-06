exports.definition = {
    config: {
        columns: {
            name: "text",
            captured: "integer",
            url: "text",
            capturedLat: "real",
            capturedLon: "real"
        },
        defaults: {
            name: "",
            captured: 0,
            url: "",
            capturedLat: 0,
            capturedLon: 0
        },
        adapter: {
            type: "sql",
            collection_name: "people"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("people", exports.definition, []);

collection = Alloy.C("people", exports.definition, model);

exports.Model = model;

exports.Collection = collection;