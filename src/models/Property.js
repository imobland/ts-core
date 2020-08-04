import Sequelize, { Model } from "sequelize";
import _ from "lodash";
import { getData, setData } from "./utils";

class Property extends Model {
  //
  static init(sequelize, config = {}) {
    //
    this.prototype.connection = sequelize;

    const fields = {
      property_id: Sequelize.NUMBER,
      realestate_id: Sequelize.NUMBER,
      user_id: Sequelize.NUMBER,

      operation_id: Sequelize.STRING,
      category_id: Sequelize.STRING,
      objective_id: Sequelize.TINYINT,
      reference: Sequelize.STRING,
      price: Sequelize.STRING,

      description: Sequelize.TEXT,
      display_url: Sequelize.STRING,
      date_created: Sequelize.DATE,
      last_modified: Sequelize.DATE,
      title: Sequelize.STRING,
      
      display_thumb: Sequelize.TEXT,
      display_colors: Sequelize.STRING,
      highlighted: Sequelize.TINYINT,
      highlighted_date: Sequelize.DATE,
      insert_date: Sequelize.DATE,
      youtube_link: Sequelize.STRING,
      keywords: Sequelize.STRING,
      
      pictures_ready: Sequelize.TINYINT,
      picture_path: Sequelize.STRING,
      location_embed: Sequelize.TEXT,
      tour360_link: Sequelize.STRING,
      friendly_url: Sequelize.STRING,

      type: { type: Sequelize.STRING, set: setData, get: getData },
      realestate: { type: Sequelize.TEXT, set: setData, get: getData },
      location: { type: Sequelize.TEXT, set: setData, get: getData },
      attributes: { type: Sequelize.TEXT, set: setData, get: getData },
      tags: { type: Sequelize.STRING, set: setData, get: getData },
      pictures: { type: Sequelize.TEXT, set: setData, get: getData },
    };

    super.init(fields, {
      tableName: "property",
      sequelize,
      ...config,
    });

    this.addHook("afterCreate", (data, options) => {
      console.log("OKKK");
    });

    return this;
  }

  // ---------------------------------------------------------------------------

  static associate(models) {
    // this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
    // this.hasMany(models.Integration, {
    //   foreignKey: "Property_id",
    //   as: "integrations",
    // });
  }

  // merge(data, only = []) {
  //   const fields = _.pick(data, only);
  //   if (_.isEmpty(fields)) {
  //     return false;
  //   }
  //   Object.assign(this, fields);
  //   return true;
  // }

  // ---------------------------------------------------------------------------
}

export default Property;
