(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./PropertyMap", "./PropertySearchMap"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./PropertyMap"), require("./PropertySearchMap"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.PropertyMap, global.PropertySearchMap);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _PropertyMap, _PropertySearchMap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "PropertyMap", {
    enumerable: true,
    get: function () {
      return _PropertyMap.default;
    }
  });
  Object.defineProperty(_exports, "PropertySearchMap", {
    enumerable: true,
    get: function () {
      return _PropertySearchMap.default;
    }
  });
  _PropertyMap = _interopRequireDefault(_PropertyMap);
  _PropertySearchMap = _interopRequireDefault(_PropertySearchMap);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});