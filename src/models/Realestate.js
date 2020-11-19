import Sequelize, { Model } from "sequelize";
import _ from "lodash";
import { getData, setData } from "./utils";

class Realestate extends Model {
  //
  static init(sequelize, config = {}) {
    //
    this.prototype.connection = sequelize;

    const fields = {
      realestate_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: Sequelize.NUMBER,
      email: Sequelize.STRING,
      domain: Sequelize.STRING,
      subdomain: Sequelize.STRING,
      nickname: Sequelize.STRING,
      picture_application_token: Sequelize.STRING,
      ssl: Sequelize.NUMBER,
      friendly_url: Sequelize.STRING,
      date_created: Sequelize.DATE,
      last_modified: Sequelize.DATE,

      lunasky: Sequelize.NUMBER,
      disabled: Sequelize.NUMBER,
    };

    super.init(fields, {
      tableName: "realestate",
      sequelize,
      ...config,
    });

    return this;
  }

  // ---------------------------------------------------------------------------

  static associate(models) {}

  // ---------------------------------------------------------------------------
}

export default Realestate;
