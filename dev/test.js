require("dotenv/config");

// import { Models, Mappers, DB } from "../dist";
import { Models, Mappers, DB } from "../src";
const { Property, PropertySearch } = Models;
const { PropertyMap, PropertySearchMap } = Mappers;

global.connection = DB.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function syncPropertySearch(property_id) {
  //
  // const { data } = require("./file.json");
  // const mappedData = PropertyMap.map(data);

  var property = await Property.findOne({ where: { property_id } });

  if (!property) return;

  // console.log(property.attr_data);
  // console.log(property.attributes);

  var searchData = PropertySearchMap.map(property);

  console.log(searchData);
  return;
  await PropertySearch.upsert(searchData);

  // conn.close();
}

const properties = [
  59871
];

const { promisify } = require("util");
const writeFile = promisify(require("fs").writeFile);

var iterator = require("../iterator.json");

const save = (data) => {
  Object.assign(iterator, data);
  console.log(iterator);
  return writeFile("./iterator.json", JSON.stringify(iterator));
};

var { i } = iterator;

const chunk = 1;

async function run() {
  //
  var conn = global.connection;

  while (i < properties.length) {
    //
    const events = [];
    const left = properties.length - i;
    const iterations = chunk <= left ? chunk : left;

    console.log(
      `chunk ${chunk}, left ${left}, iterations ${iterations} ${"-".repeat(50)}`
    );

    for (let c = 0; c < iterations; c++) {
      await syncPropertySearch(properties[i]);
      i++;
    }

    await Promise.all(events);

    // await save({ i });

    break;
  }

  conn.close();
}

console.log("OK");

run();
