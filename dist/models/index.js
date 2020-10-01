(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Property", "./PropertySearch", "./Realestate"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Property"), require("./PropertySearch"), require("./Realestate"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Property, global.PropertySearch, global.Realestate);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Property, _PropertySearch, _Realestate) {
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
  Object.defineProperty(_exports, "Realestate", {
    enumerable: true,
    get: function () {
      return _Realestate.default;
    }
  });
  _Property = _interopRequireDefault(_Property);
  _PropertySearch = _interopRequireDefault(_PropertySearch);
  _Realestate = _interopRequireDefault(_Realestate);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});