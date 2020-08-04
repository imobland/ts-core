(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  module.exports = {
    getData(key) {
      const str = this.getDataValue(key);
      if (!str) return;
      const [, type, json] = str.match(/^\^\[(array|object)\](.*)/i);
      return JSON.parse(json);
    },

    setData(val, key) {
      var type = typeof val;

      if (Array.isArray(val)) {
        type = "array";
      }

      const str = `^[${type}]` + JSON.stringify(val);
      this.setDataValue(key, str);
    }

  };
});