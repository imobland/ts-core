(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../models", "../utils/Cache", "lodash"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../models"), require("../utils/Cache"), require("lodash"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.models, global.Cache, global.lodash);
    global.PropertyView = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _models, _Cache, _lodash) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _Cache = _interopRequireDefault(_Cache);
  _lodash = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  const PropertyAttrService = {
    //
    async getAttrs(property) {
      //
      const sql = `SELECT p.*, c.value 
      FROM (SELECT * FROM property_attr pa WHERE pa.property_id = :property_id) c 
      INNER JOIN
      property_type_attr p 
      ON p.property_type_attr_id=c.property_type_attr_id;`;
      let [results] = await property.connection.query(sql, {
        replacements: property
      });
      return results;
    },

    async masterList(property) {
      //
      const rows = await property.connection.query("CALL property_attr_master_tags(:property_id)", {
        replacements: property
      });
      return rows;
    },

    async tagList(property) {
      //
      const rows = await property.connection.query("SELECT get_property_tags(:property_id) tags", {
        replacements: property
      });
      return rows[0][0].tags.trim().replace(/\s+/g, ",").split(",");
    }

  };

  class PropertyView {
    //
    static async build(property) {
      //
      if (property.changed()) {
        throw Error("Property must be pristine");
      }

      const $property = {};
      await Promise.all([this.fill_attr($property, property), this.fill_tags($property, property), this.fill_type($property, property), this.fill_realestate($property, property), this.fill_agent($property, property), this.fill_location($property, property), this.fill_pictures($property, property), this.fill_integrations($property, property)]);
      this.fill_basic($property, property);
      this.fill_title($property, property);
      return $property;
    }

    static async fill_integrations($property, property) {
      //
      const sql = `SELECT GROUP_CONCAT(i.\`key\` separator ',') \`items\`
        FROM integration i INNER JOIN connection_property_integration cpi ON
          cpi.property_id=:property_id AND
          cpi.integration_id = i.integration_id
          AND i.active=1;`;
      let [result] = await property.connection.query(sql, {
        replacements: property
      });

      const integrations = _lodash.default.get(result, "[0].items", "");

      $property.integrations = integrations ? integrations.split(",") : [];
    }

    static fill_basic($property, property) {
      //
      $property.property_id = property.property_id;
      $property.realestate_id = property.realestate_id;
      $property.user_id = property.user_id;
      $property.reference = property.reference;
      $property.price = property.price;
      $property.description = property.description;
      $property.date_created = property.insert_date;
      $property.last_modified = property.last_modified;
      $property.objective_id = property.objective_id;
      $property.youtube_link = property.youtube_link;
      $property.keywords = property.keywords;
      $property.friendly_url = property.friendly_url;
      $property.pictures_ready = true;
      $property.location_embed = property.location_embed;
      $property.tour360_link = property.tour360_link;

      switch (property.operation_id) {
        case 1:
          $property.operation_id = "sale";
          break;

        case 2:
          $property.operation_id = "rent";
          break;

        case 3:
          $property.operation_id = "season";
          break;

        default:
          $property.operation_id = "none";
          break;
      }
    }

    static async fill_location($property, property) {
      //
      const data = {};
      const location = await _models.PropertyLocation.findByPk(property.property_id);
      data.street = location.street;
      data.number = location.number;
      data.postalcode = location.cep;
      data.complement = location.complement;
      data.position = {
        lat: location.lat,
        lon: location.lon
      };
      const state = await _Cache.default.get(`state/${location.state_id}`, () => _models.State.findByPk(location.state_id));

      if (state) {
        data.state = {
          id: state.state_id,
          name: state.name,
          acronym: state.abbreviations
        };
      }

      const city = await _Cache.default.get(`city/${location.city_id}`, () => _models.City.findByPk(location.city_id));

      if (city) {
        data.city = {
          id: city.city_id,
          name: city.name
        };
      }

      const district = await _Cache.default.get(`district/${location.district_id}`, () => _models.District.findByPk(location.district_id));

      if (district) {
        data.district = {
          id: district.district_id,
          name: district.name
        };
      }

      $property.location = data;
    }

    static async fill_attr($property, property) {
      //
      const [fields, attributes] = await Promise.all([PropertyAttrService.masterList(property), PropertyAttrService.getAttrs(property)]);
      const attrs = {};
      fields.map(({
        name,
        value
      }) => attrs[name] = value);
      $property.attr_data = attrs;
      $property.attributes = attributes.map(row => ({
        id: row.property_type_attr_id,
        ..._lodash.default.pick(row, ["name", "type", "label", "value", "value_string", "group"])
      }));
    }

    static fill_title($property, property) {
      //
      if (property.title.length > 0) {
        $property.title = property.title;
        return;
      }

      var operation = "";
      var district = "";

      switch (property.operation_id) {
        case 1:
          operation = " à venda";
          break;

        case 2:
          operation = " para alugar";
          break;

        case 3:
          operation = " para temporada";
          break;

        default:
          operation = "";
          break;
      }

      const location = $property.location;

      if (_lodash.default.has(location, "district.name")) {
        district = " em " + _lodash.default.get(location, "district.name");
      }

      $property.title = $property.type.name + operation + district;
    }

    static async fill_type($property, property) {
      //
      const {
        property_type_id,
        name,
        category
      } = await _Cache.default.get(`type/${property.type_id}`, () => _models.PropertyType.findByPk(property.type_id));
      $property.type = {
        id: property_type_id,
        name: name,
        category_id: category
      };
    }

    static async fill_agent($property, property) {
      //
      const agent = await _Cache.default.get(`agent/${property.agent_id}`, () => _models.Agent.findByPk(property.agent_id));
      $property.agent = {
        id: property.agent_id,
        ..._lodash.default.pick(agent, ["name", "email", "phone"])
      };
    }

    static async fill_realestate($property, property) {
      //
      const {
        realestate_id,
        name,
        nickname
      } = await _Cache.default.get(`realestate/${property.realestate_id}`, () => _models.Realestate.findByPk(property.realestate_id));
      $property.realestate = {
        id: realestate_id,
        name,
        nickname
      };
    }

    static async picture_server(realestate_id) {
      //
      servers = await _Cache.default.get(`realestate/${realestate_id}/servers`, () => {
        return get_realestate_servers_service_domain.by_id(realestate_id);
      });
      return servers.picture;
    }

    static async fill_pictures($property, property) {
      //
      const pics = await _models.Picture.findAll({
        where: {
          property_id: property.property_id
        },
        order: [["position"], ["insert_date", "DESC"]]
      });
      $property.display_thumb = "";
      $property.display_url = "";
      $property.picture_path = "";

      const index = _lodash.default.findIndex(pics, {
        display: 1
      });

      if (index >= 0) {
        const mainPic = pics[index];
        $property.display_url = mainPic.src;
        $property.picture_path = mainPic.path;
      }

      $property.pictures = pics.map(pic => {
        return { ..._lodash.default.pick(pic, ["picture_id", "display", "src", "path"]),
          fullpath: _models.Picture.getFullPath(pic)
        };
      });
    }

    static async fill_tags($property, property) {
      $property.tags = await PropertyAttrService.tagList(property);
    }

  }

  _exports.default = PropertyView;
});