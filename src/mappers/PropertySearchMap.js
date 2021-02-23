import _ from "lodash";

function parseTags(str) {
  if (str && typeof str == "string") {
    return str
      .replace(/\s+/g, " ")
      .split(" ")
      .map((tag) => _.kebabCase(tag))
      .map((tag) => (tag.match(/^\d/) ? "_" + tag : tag))
      .join(" ");
  }
}

function nestedValues(data) {
  const rows = [];
  const run = (data) => {
    data &&
      Object.values(data).map((row) => {
        if (typeof row == "object") {
          run(row);
        } else {
          row && rows.push(row);
        }
      });
  };
  if (typeof data == "object") {
    run(data);
  }
  return rows;
}

function getWords(data) {
  let words = [];

  if (data.reference) {
    _.kebabCase(data.reference)
      .split("-")
      .map((key) => words.push(key));
    words.push(data.reference);
  }
  if (data.type) {
    words.push(data.type.name);
  }
  if (data.title) {
    words.push(data.title);
  }
  if (data.keywords) {
    words.push(data.keywords);
  }
  if (data.price) {
    words.push(data.price);
  }
  switch (data.operation_id) {
    case "sale":
      words.push("vender", "venda", "sale");
      break;
    case "rent":
      words.push("aluguel", "alugar", "rent");
      break;
    case "season":
      words.push("veraneio", "temporada", "season");
      break;
  }

  data.location && nestedValues(data.location).map((tag) => words.push(tag));

  data.attributes.map((attr) => {
    if (attr && attr.label) {
      words.push(attr.label);
    }
  });

  console.log(data.attributes);
  // ---------------------------------------------------------------------------

  let keys = [];

  words.map(
    (tag) =>
      tag &&
      tag
        .toString()
        .split(" ")
        .map((key) => {
          key && keys.push(_.kebabCase(key).replace(/\-/, ""));
        })
  );

  return _.sortedUniq(keys)
    .map((tag) => (tag.match(/^\d/) ? "_" + tag : tag))
    .join(" ");
}

export default {
  //
  map(property) {
    //
    const data = {};

    data.id = property.id;

    data.property_id = property.property_id;
    data.realestate_id = property.realestate_id;
    data.user_id = property.user_id;

    data.title = property.title;
    data.reference = property.reference;
    data.price = property.price;

    if (property.type) {
      data.type_id = property.type.id;
      data.type_name = property.type.name;
    }

    var op = property.operation_id;
    data.operation_id =
      op == "sale" ? 1 : op == "rent" ? 2 : op == "season" ? 3 : 0;

    if (property.highlighted) {
      data.highlighted = true;
      data.highlighted_date = property.highlighted_date;
    }

    data.objective_id = property.objective_id;

    data.description = parseTags(property.description);

    const location = property.location;

    if (location) {
      if (location.state) {
        data.state_id = location.state.id;
        data.state_name = location.state.name;
        data.state_acronym = location.state.acronym;
      }
      if (location.city) {
        data.city_id = location.city.id;
        data.city_name = location.city.name;
      }
      if (location.district) {
        data.district_id = location.district.id;
        data.district_name = location.district.name;
      }
      if (location.position) {
        data.lat = location.position.lat;
        data.lon = location.position.lon;
      }
      if (location.street) {
        data.street = location.street;
      }
    }

    data.date_created = property.date_created;

    data.keywords = parseTags(property.keywords);

    data.tags = property.tags
      .map((tag) => _.kebabCase(tag))
      .map((tag) => (tag.match(/^\d/) ? "_" + tag : tag))
      .join(" ");

    data.words = getWords(property);

    // -------------------------------------------------------------------------

    const primaries = { bed: "bedrooms", bath: "bathrooms", garage: "garage" };

    for (const i in property.attributes) {
      const row = property.attributes[i];
      if (row && primaries.hasOwnProperty(row.name)) {
        data[primaries[row.name]] = row.value;
      }
    }

    return data;
  },
};
