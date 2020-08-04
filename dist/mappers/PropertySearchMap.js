(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "lodash"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("lodash"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lodash);
    global.PropertySearchMap = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _lodash) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _lodash = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function parseTags(str) {
    return str.replace(/\s+/g, " ").split(" ").map(tag => _lodash.default.kebabCase(tag)).map(tag => tag.match(/^\d/) ? "_" + tag : tag).join(" ");
  }

  function nestedValues(data) {
    const rows = [];

    const run = data => {
      Object.values(data).map(row => {
        if (typeof row == "object") {
          run(row);
        } else {
          rows.push(row);
        }
      });
    };

    run(data);
    return rows;
  }

  function getWords(data) {
    let words = [];

    if (data.reference) {
      words.push(data.reference);
    }

    if (data.type) {
      words.push(data.type.name);
    }

    if (data.title) {
      words.push(data.title);
    }

    if (data.keywords) {
      words.push(data.keywords);
    }

    if (data.price) {
      words.push(data.price);
    }

    switch (data.operation_id) {
      case "sale":
        words.push("vender", "venda", "sale");
        break;

      case "rent":
        words.push("aluguel", "alugar", "rent");
        break;

      case "season":
        words.push("veraneio", "temporada", "season");
        break;
    }

    const location = data.location;
    nestedValues(location).map(tag => words.push(tag));
    data.attributes.map(attr => {
      if (attr.label) {
        words.push(attr.label);
      }
    });
    return words.map(tag => _lodash.default.kebabCase(tag).split("-").join(" ")).map(tag => tag.match(/^\d/) ? "_" + tag : tag).join(" ");
  }

  var _default = {
    //
    map(property) {
      //
      const data = {};
      data.id = property.id;
      data.property_id = property.property_id;
      data.realestate_id = property.realestate_id;
      data.user_id = property.user_id;
      data.title = property.title;
      data.reference = property.reference;
      data.price = property.price;
      data.type_id = property.type.id;
      data.type_name = property.type.name;
      var op = property.operation_id;
      data.operation_id = op == "sale" ? 1 : op == "rent" ? 2 : op == "season" ? 3 : 0;

      if (property.highlighted) {
        data.highlighted = true;
        data.highlighted_date = property.highlighted_date;
      }

      data.objective_id = property.objective_id;
      data.description = parseTags(property.description);
      data.state_id = property.location.state.id;
      data.state_name = property.location.state.name;
      data.state_acronym = property.location.state.acronym;
      data.city_id = property.location.city.id;
      data.city_name = property.location.city.name;
      data.district_id = property.location.district.id;
      data.district_name = property.location.district.name;
      data.lat = property.location.position.lat;
      data.lon = property.location.position.lon;
      data.date_created = property.insert_date;
      data.keywords = parseTags(property.keywords);
      data.tags = property.tags.map(tag => _lodash.default.kebabCase(tag)).map(tag => tag.match(/^\d/) ? "_" + tag : tag).join(" ");
      data.words = getWords(property);

      if (property.attr_data) {
        data.bedrooms = property.attr_data.bed;
        data.bathrooms = property.attr_data.bath;
        data.garage = property.attr_data.garage;
      }

      return data;
    }

  };
  _exports.default = _default;
});