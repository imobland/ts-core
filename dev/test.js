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

  // const { data } = require("./file.json");

  const data = {
    property_id: undefined,
    realestate_id: undefined,
    user_id: undefined,
    operation_id: "rent",
    category_id: null,
    objective_id: 1,
    reference: "617",
    price: "",
    description:
      "Suíte de Luxo à venda no Beach Village, pé na areia no coração de Jurerê.\r\n" +
      "Com 1 suíte, cozinha americana planejada, 51,42m² de área privativa, virado para área externa sendo posição solar Leste/Sul, sol da manhã.\r\n" +
      "\r\n" +
      "Áreas de lazer e serviços fazem do Jurerê Beach Village a escolha ideal para vivenciar com conforto o mar a seus pés.\r\n" +
      "Águas calmas, cristalinas e areias brancas, a deslumbrante praia é o cenário perfeito para qualquer ocasião. Os espaços aconchegantes são ideais para o descanso e curtir o melhor que a vida tem a oferecer.\r\n" +
      "Para quem deseja sair da rotina.",
    date_created: "2020-07-10",
    last_modified: "2020-07-10",
    title: "Apartamento",
    display_thumb: undefined,
    display_colors: "",
    highlighted: 0,
    highlighted_date: 0,
    insert_date: 1596770085555,
    youtube_link: undefined,
    keywords: "",
    pictures_ready: undefined,
    picture_path: 0,
    location_embed: undefined,
    tour360_link: undefined,
    friendly_url: undefined,
    type: { id: 10, label: "Apartamento", category: "apartment" },
    realestate: undefined,
    location: {
      street: "Rua César Nascimento",
      number: "646",
      postalcode: "88053-500",
      complement: "276",
      city: { name: "Florianópolis" },
      district: { name: "Jurerê" },
      state: { name: null, acronym: "SC", abreviation: "SC" },
      position: { lat: "-27.4389433", lon: "-48.48942529999999" },
    },
    tags: [],
    pictures: [],
  };
  const mappedData = PropertyMap.map(data);

  // var property = await Property.findOne({ where: { property_id: 58702 } });
  // if (property) {
  //   Object.assign(property, mappedData);
  //   await property.save();
  // } else {
  //   property = await Property.create(mappedData);
  // }

  var searchData = PropertySearchMap.map(mappedData);

  console.log(searchData);
  // await PropertySearch.upsert(searchData);

  conn.close();
}

runAsync();
