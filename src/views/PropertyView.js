import {
  PropertyType,
  Realestate,
  Picture,
  Agent,
  PropertyLocation,
  City,
  State,
  District,
  Property,
} from "../models";

import Cache from "../utils/Cache";
import _ from "lodash";

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
      replacements: property,
    });

    return results;
  },
  async masterList(property) {
    //
    const rows = await property.connection.query(
      "CALL property_attr_master_tags(:property_id)",
      { replacements: property }
    );
    return rows;
  },
  async tagList(property) {
    //
    const rows = await property.connection.query(
      "SELECT get_property_tags(:property_id) tags",
      { replacements: property }
    );

    return rows[0][0].tags.trim().replace(/\s+/g, ",").split(",");
  },
};

export default class PropertyView {
  //
  static async build(property) {
    //
    if (property.changed()) {
      throw Error("Property must be pristine");
    }

    const $property = {};

    await Promise.all([
      this.fill_attr($property, property),
      this.fill_tags($property, property),
      this.fill_type($property, property),
      this.fill_realestate($property, property),
      this.fill_agent($property, property),
      this.fill_location($property, property),
      this.fill_pictures($property, property),
      this.fill_integrations($property, property),
    ]);

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
      replacements: property,
    });

    const integrations = _.get(result, "[0].items", "");

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

    const location = await PropertyLocation.findByPk(property.property_id);

    data.street = location.street;
    data.number = location.number;
    data.postalcode = location.cep;
    data.complement = location.complement;

    data.position = { lat: location.lat, lon: location.lon };

    const state = await Cache.get(`state/${location.state_id}`, () =>
      State.findByPk(location.state_id)
    );

    if (state) {
      data.state = {
        id: state.state_id,
        name: state.name,
        acronym: state.abbreviations,
      };
    }

    const city = await Cache.get(`city/${location.city_id}`, () =>
      City.findByPk(location.city_id)
    );

    if (city) {
      data.city = {
        id: city.city_id,
        name: city.name,
      };
    }

    const district = await Cache.get(`district/${location.district_id}`, () =>
      District.findByPk(location.district_id)
    );

    if (district) {
      data.district = {
        id: district.district_id,
        name: district.name,
      };
    }

    $property.location = data;
  }

  static async fill_attr($property, property) {
    //
    const [fields, attributes] = await Promise.all([
      PropertyAttrService.masterList(property),
      PropertyAttrService.getAttrs(property),
    ]);

    const attrs = {};
    fields.map(({ name, value }) => (attrs[name] = value));
    $property.attr_data = attrs;

    $property.attributes = attributes.map((row) => ({
      id: row.property_type_attr_id,
      ..._.pick(row, [
        "name",
        "type",
        "label",
        "value",
        "value_string",
        "group",
      ]),
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

    if (_.has(location, "district.name")) {
      district = " em " + _.get(location, "district.name");
    }

    $property.title = $property.type.name + operation + district;
  }

  static async fill_type($property, property) {
    //
    const {
      property_type_id,
      name,
      category,
    } = await Cache.get(`type/${property.type_id}`, () =>
      PropertyType.findByPk(property.type_id)
    );

    $property.type = {
      id: property_type_id,
      name: name,
      category_id: category,
    };
  }

  static async fill_agent($property, property) {
    //
    const agent = await Cache.get(`agent/${property.agent_id}`, () =>
      Agent.findByPk(property.agent_id)
    );

    $property.agent = {
      id: property.agent_id,
      ..._.pick(agent, ["name", "email", "phone"]),
    };
  }

  static async fill_realestate($property, property) {
    //
    const {
      realestate_id,
      name,
      nickname,
    } = await Cache.get(`realestate/${property.realestate_id}`, () =>
      Realestate.findByPk(property.realestate_id)
    );

    $property.realestate = { id: realestate_id, name, nickname };
  }

  static async picture_server(realestate_id) {
    //
    servers = await Cache.get(`realestate/${realestate_id}/servers`, () => {
      return get_realestate_servers_service_domain.by_id(realestate_id);
    });

    return servers.picture;
  }

  static async fill_pictures($property, property) {
    //
    const pics = await Picture.findAll({
      where: { property_id: property.property_id },
      order: [["position"], ["insert_date", "DESC"]],
    });

    $property.display_thumb = "";
    $property.display_url = "";
    $property.picture_path = "";

    const index = _.findIndex(pics, { display: 1 });

    if (index >= 0) {
      const mainPic = pics[index];
      $property.display_url = mainPic.src;
      $property.picture_path = mainPic.path;
    }

    $property.pictures = pics.map((pic) => {
      return {
        ..._.pick(pic, ["picture_id", "display", "src", "path"]),
        fullpath: Picture.getFullPath(pic),
      };
    });
  }

  static async fill_tags($property, property) {
    $property.tags = await PropertyAttrService.tagList(property);
  }
}
