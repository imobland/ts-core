(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Property", "./PropertySearch"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Property"), require("./PropertySearch"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Property, global.PropertySearch);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Property, _PropertySearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Property", {
    enumerable: true,
    get: function () {
      return _Property.default;
    }
  });
  Object.defineProperty(_exports, "PropertySearch", {
    enumerable: true,
    get: function () {
      return _PropertySearch.default;
    }
  });
  _Property = _interopRequireDefault(_Property);
  _PropertySearch = _interopRequireDefault(_PropertySearch);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});