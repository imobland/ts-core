import Sequelize, { Model } from "sequelize";

class PropertySearch extends Model {
  //
  static init(sequelize, config = {}) {
    //
    this.prototype.connection = sequelize;

    const fields = {
      property_id: Sequelize.NUMBER,
      realestate_id: Sequelize.NUMBER,
      user_id: Sequelize.NUMBER,
      title: Sequelize.STRING,
      reference: Sequelize.STRING,
      type_id: Sequelize.NUMBER,
      type_name: Sequelize.STRING,
      operation_id: Sequelize.NUMBER,
      price: Sequelize.NUMBER,
      objective_id: Sequelize.NUMBER,
      words: Sequelize.TEXT,
      tags: Sequelize.TEXT,
      description: Sequelize.STRING,
      highlighted: Sequelize.STRING,
      highlighted_date: Sequelize.DATE,
      state_id: Sequelize.NUMBER,
      state_name: Sequelize.STRING,
      state_acronym: Sequelize.STRING,
      city_id: Sequelize.NUMBER,
      city_name: Sequelize.STRING,
      district_id: Sequelize.NUMBER,
      district_name: Sequelize.STRING,
      lat: Sequelize.DOUBLE,
      lon: Sequelize.DOUBLE,
      token: Sequelize.STRING,
      date_created: Sequelize.DATE,
      last_modified: Sequelize.DATE,
      keywords: Sequelize.TEXT,
      bedrooms: Sequelize.NUMBER,
      bathrooms: Sequelize.NUMBER,
      area: Sequelize.NUMBER,
      garage: Sequelize.NUMBER,
    };

    super.init(fields, {
      tableName: "property_search",
      sequelize,
      ...config,
    });

    return this;
  }

  static associate(models) {}
}

export default PropertySearch;
