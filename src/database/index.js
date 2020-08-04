import Sequelize from "sequelize";
import dbConfig from "../config/database";

import Property from "../models/Property";
// import Realestate from "../models/Realestate";
import PropertySearch from "../models/PropertySearch";

var sequelize;

const connect = (config = {}) => {
  //
  sequelize = new Sequelize({ ...dbConfig, ...config });

  console.log("DB connected");

  const models = config.models ? config.models : {};

  // Realestate.init(sequelize, models.Realestate);
  Property.init(sequelize, models.Property);
  PropertySearch.init(sequelize, models.PropertySearch);

  // Realestate.associate(sequelize.models);
  Property.associate(sequelize.models);
  PropertySearch.associate(sequelize.models);

  return sequelize;
};

const getConnection = () => {
  if (!sequelize) {
    throw "database not connected";
  }
  return sequelize;
};

export default {
  connect,
  getConnection,
};
