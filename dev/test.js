require("dotenv/config");

import { Models, Mappers, DB } from "../dist";
const { Property, PropertySearch } = Models;
const { PropertyMap, PropertySearchMap } = Mappers;

global.connection = DB.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function runAsync() {
  //
  var conn = global.connection;

  const { data } = require("./file.json");

  const mappedData = PropertyMap.map(data);

  var property = await Property.findOne({ where: { property_id: 55607 } });

  if (property) {
    Object.assign(property, mappedData);
    await property.save();
  } else {
    property = await Property.create(mappedData);
  }

  var searchData = PropertySearchMap.map(property);

  await PropertySearch.upsert(searchData);

  conn.close();
}

runAsync();
