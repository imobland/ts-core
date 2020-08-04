(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./PropertyView", "./PropertySearch"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./PropertyView"), require("./PropertySearch"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.PropertyView, global.PropertySearch);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _PropertyView, _PropertySearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "PropertyView", {
    enumerable: true,
    get: function () {
      return _PropertyView.default;
    }
  });
  Object.defineProperty(_exports, "PropertySearch", {
    enumerable: true,
    get: function () {
      return _PropertySearch.default;
    }
  });
  _PropertyView = _interopRequireDefault(_PropertyView);
  _PropertySearch = _interopRequireDefault(_PropertySearch);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});