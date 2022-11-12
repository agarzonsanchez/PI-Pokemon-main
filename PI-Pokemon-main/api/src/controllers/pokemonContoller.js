const { Pokemon, Type } = require("../db");
const fetch = require("node-fetch");

// DATABASE
const pokemonDB = async () => {
  return Pokemon.findAll({
    include: {
      model: Type,
      attriutes: ["type"],
      through: {
        attributes: [],
      },
    },
  });
};

// API
const apiDB = async () => {
  const pokeApi = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
    method: "GET",
  });
  const dataJson = await pokeApi.json();
  let allData = [];
  let index = 0;
  for (let i = 1; i < 152; i++) {
    let allTypes = [];
    const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`, {
      method: "GET",
    });
    const detailsData = await details.json();
    let poke = {};
    poke["name"] = dataJson.results[index++].name;
    poke["hp"] = detailsData.stats[0].base_stat;
    poke["attack"] = detailsData.stats[1].base_stat;
    poke["defense"] = detailsData.stats[2].base_stat;
    poke["speed"] = detailsData.stats[5].base_stat;
    poke["height"] = detailsData.height;
    poke["weight"] = detailsData.weight;
    poke["image"] = detailsData.sprites.other["official-artwork"].front_default;
    for (let k = 0; k < detailsData.types.length; k++) {
      allTypes.push(detailsData.types[k].type.name);
    }
    let nuevo = await Pokemon.create(poke);
    linkType(nuevo, allTypes);

    allData.push(poke);
  }
  console.log(allData);
  return allData;
};

// TYPES
const getType = async () => {
  let pokemonType = {};
  let pokemonArr = [];
  let arrType = [];
  for (let i = 1; i < 152; i++) {
    const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`, {
      method: "GET",
    });
    const apiTypes = await details.json();
    for (let k = 0; k < apiTypes.types.length; k++) {
      arrType.push(apiTypes.types[k].type.name);
    }
  }

  // saves types in DB
  arrType
    .filter((t, i) => arrType.indexOf(t) === i)
    .forEach((t) =>
      Type.findOrCreate({
        where: {
          type: t.trim(),
        },
      })
    );

  const pokeTypes = await Type.findAll({ order: [["type"]] });

  for (let i = 0; i < pokeTypes.length; i++) {
    pokemonArr.push(pokeTypes[i].type);
  }
  pokemonType["type"] = pokemonArr;
  return pokemonType;
};

//MIDDLE TABLE
const linkType = async (poke, poketype) => {
  for (let i = 0; i < poketype.length; i++) {
    const tipo = await Type.findAll({
      where: { type: poketype[i] },
    });
    //console.log(tipo);
    poke.addType(tipo);
  }
  return undefined;
};

// CHECKS DATABASE
const validate = async () => {
  const p = await Pokemon.findByPk(1);
  if (p === null) {
    await getType();
    const data = await apiDB();

    return data;
  } else {
    const data = await pokemonDB();
    return data;
  }
};

module.exports = { apiDB, getType, validate, pokemonDB };
