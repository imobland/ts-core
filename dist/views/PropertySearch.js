(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../models"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../models"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.models);
    global.PropertySearch = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _models) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class PropertySearch {
    //
    static async getTags() {
      return "home house sale no-objective highlighted published  stairs garage bath " + "garden release accepts-exchange rented funded endorsed geminate " + "under-construction";
    }

    static async getWords() {
      return "ref-19 casa vender venda sale 300000 centro ponta grossa parana await 270 23";
    }

    static async getDescription() {
      return "";
    }

    static async build(property) {
      const __ = {
        property_id: 58193,
        realestate_id: 1,
        user_id: 1,
        words: "ref-19 casa vender venda sale 300000 centro ponta grossa parana 270 23 ",
        description: "description ",
        reference: "REF-19",
        published: 1,
        highlighted: "1",
        price: 300000,
        type_id: 1,
        operation_id: 1,
        objective_id: 0,
        city_id: 2,
        district_id: 10,
        state_id: 18,
        lat: 0,
        lon: 0,
        last_modified: null,
        date_created: "2020-07-18T03:22:29.000Z",
        highlighted_date: "2020-07-18T06:22:27.000Z",
        token: null,
        title: "",
        tags: "home house sale no-objective highlighted published  stairs garage bath " + "garden release accepts-exchange rented funded endorsed geminate " + "under-construction"
      };
      const {
        property_id,
        realestate_id,
        user_id,
        reference,
        published,
        lat,
        lon,
        highlighted_date,
        insert_date,
        highlighted,
        price,
        type_id,
        operation_id,
        objective_id
      } = property;
      const location = await _models.PropertyLocation.findByPk(property.property_id);
      const {
        city_id,
        district_id,
        state_id
      } = location;
      const words = await this.getWords(property);
      const tags = await this.getTags(property);
      const description = await this.getDescription(property);
      const search = {
        property_id,
        realestate_id,
        user_id,
        reference,
        published,
        lat,
        lon,
        date_created: insert_date,
        highlighted_date,
        words,
        tags,
        description,
        highlighted,
        price,
        type_id,
        operation_id,
        objective_id,
        city_id,
        district_id,
        state_id
      };
      return search;
    }

  }

  _exports.default = PropertySearch;
});