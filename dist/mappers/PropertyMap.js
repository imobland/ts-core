(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.PropertyMap = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function getPictureDisplay(data) {
    for (const i in data.pictures) {
      if (data.pictures[i].display) {
        return data.pictures[i].path;
      }
    }

    return data.pictures.length && data.pictures[0].path;
  }

  var _default = {
    map(data) {
      //
      return {
        property_id: data.property_id,
        realestate_id: data.realestate_id,
        user_id: data.user_id,
        operation_id: data.operation_id,
        category_id: null,
        objective_id: data.objective_id,
        reference: data.reference,
        price: data.price,
        description: data.description,
        date_created: data.date_created,
        last_modified: data.last_modified,
        title: data.title,
        display_thumb: data.display_thumb,
        display_colors: "",
        highlighted: 0,
        highlighted_date: 0,
        insert_date: Date.now(),
        youtube_link: data.youtube_link,
        keywords: data.keywords,
        pictures_ready: data.pictures_ready,
        picture_path: getPictureDisplay(data),
        display_url: data.display_url,
        location_embed: data.location_embed,
        tour360_link: data.tour360_link,
        friendly_url: data.friendly_url,
        type: data.type,
        realestate: data.realestate,
        location: data.location,
        attributes: data.attributes,
        tags: data.tags,
        pictures: data.pictures
      };
    }

  }; // SOBROU
  // integrations: data.integrations,
  // attr_data: data.attr_data,

  _exports.default = _default;
});