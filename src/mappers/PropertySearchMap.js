import _ from "lodash";

function parseTags(str) {
  return str
    .replace(/\s+/g, " ")
    .split(" ")
    .map((tag) => _.kebabCase(tag))
    .map((tag) => (tag.match(/^\d/) ? "_" + tag : tag))
    .join(" ");
}

function nestedValues(data) {
  const rows = [];
  const run = (data) => {
    Object.values(data).map((row) => {
      if (typeof row == "object") {
        run(row);
      } else {
        rows.push(row);
      }
    });
  };
  run(data);
  return rows;
}

function getWords(data) {
  let words = [];

  if (data.reference) {
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

  const location = data.location;

  nestedValues(location).map((tag) => words.push(tag));

  data.attributes.map((attr) => {
    if (attr.label) {
      words.push(attr.label);
    }
  });

  return words
    .map((tag) => _.kebabCase(tag).split("-").join(" "))
    .join(" ")
    .split(" ")
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
    }

    data.date_created = property.insert_date;

    data.keywords = parseTags(property.keywords);

    data.tags = property.tags
      .map((tag) => _.kebabCase(tag))
      .map((tag) => (tag.match(/^\d/) ? "_" + tag : tag))
      .join(" ");

    data.words = getWords(property);

    if (property.attr_data) {
      data.bedrooms = property.attr_data.bed;
      data.bathrooms = property.attr_data.bath;
      data.garage = property.attr_data.garage;
    }

    return data;
  },
};
