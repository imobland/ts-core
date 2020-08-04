(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "sequelize", "lodash", "./utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("sequelize"), require("lodash"), require("./utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.sequelize, global.lodash, global.utils);
    global.Property = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _sequelize, _lodash, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _sequelize = _interopRequireWildcard(_sequelize);
  _lodash = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  class Property extends _sequelize.Model {
    //
    static init(sequelize, config = {}) {
      //
      this.prototype.connection = sequelize;
      const fields = {
        property_id: _sequelize.default.NUMBER,
        realestate_id: _sequelize.default.NUMBER,
        user_id: _sequelize.default.NUMBER,
        operation_id: _sequelize.default.STRING,
        category_id: _sequelize.default.STRING,
        objective_id: _sequelize.default.TINYINT,
        reference: _sequelize.default.STRING,
        price: _sequelize.default.STRING,
        description: _sequelize.default.TEXT,
        display_url: _sequelize.default.STRING,
        date_created: _sequelize.default.DATE,
        last_modified: _sequelize.default.DATE,
        title: _sequelize.default.STRING,
        display_thumb: _sequelize.default.TEXT,
        display_colors: _sequelize.default.STRING,
        highlighted: _sequelize.default.TINYINT,
        highlighted_date: _sequelize.default.DATE,
        insert_date: _sequelize.default.DATE,
        youtube_link: _sequelize.default.STRING,
        keywords: _sequelize.default.STRING,
        pictures_ready: _sequelize.default.TINYINT,
        picture_path: _sequelize.default.STRING,
        location_embed: _sequelize.default.TEXT,
        tour360_link: _sequelize.default.STRING,
        friendly_url: _sequelize.default.STRING,
        type: {
          type: _sequelize.default.STRING,
          set: _utils.setData,
          get: _utils.getData
        },
        realestate: {
          type: _sequelize.default.TEXT,
          set: _utils.setData,
          get: _utils.getData
        },
        location: {
          type: _sequelize.default.TEXT,
          set: _utils.setData,
          get: _utils.getData
        },
        attributes: {
          type: _sequelize.default.TEXT,
          set: _utils.setData,
          get: _utils.getData
        },
        tags: {
          type: _sequelize.default.STRING,
          set: _utils.setData,
          get: _utils.getData
        },
        pictures: {
          type: _sequelize.default.TEXT,
          set: _utils.setData,
          get: _utils.getData
        }
      };
      super.init(fields, {
        tableName: "property",
        sequelize,
        ...config
      });
      this.addHook("afterCreate", (data, options) => {
        console.log("OKKK");
      });
      return this;
    } // ---------------------------------------------------------------------------


    static associate(models) {// this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
      // this.hasMany(models.Integration, {
      //   foreignKey: "Property_id",
      //   as: "integrations",
      // });
    } // merge(data, only = []) {
    //   const fields = _.pick(data, only);
    //   if (_.isEmpty(fields)) {
    //     return false;
    //   }
    //   Object.assign(this, fields);
    //   return true;
    // }
    // ---------------------------------------------------------------------------


  }

  var _default = Property;
  _exports.default = _default;
});