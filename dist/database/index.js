(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "sequelize", "../config/database", "../models/Property", "../models/PropertySearch"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("sequelize"), require("../config/database"), require("../models/Property"), require("../models/PropertySearch"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.sequelize, global.database, global.Property, global.PropertySearch);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _sequelize, _database, _Property, _PropertySearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _sequelize = _interopRequireDefault(_sequelize);
  _database = _interopRequireDefault(_database);
  _Property = _interopRequireDefault(_Property);
  _PropertySearch = _interopRequireDefault(_PropertySearch);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // import Realestate from "../models/Realestate";
  var sequelize;

  const connect = (config = {}) => {
    //
    sequelize = new _sequelize.default({ ..._database.default,
      ...config
    });
    console.log("DB connected");
    const models = config.models ? config.models : {}; // Realestate.init(sequelize, models.Realestate);

    _Property.default.init(sequelize, models.Property);

    _PropertySearch.default.init(sequelize, models.PropertySearch); // Realestate.associate(sequelize.models);


    _Property.default.associate(sequelize.models);

    _PropertySearch.default.associate(sequelize.models);

    return sequelize;
  };

  const getConnection = () => {
    if (!sequelize) {
      throw "database not connected";
    }

    return sequelize;
  };

  var _default = {
    connect,
    getConnection
  };
  _exports.default = _default;
});