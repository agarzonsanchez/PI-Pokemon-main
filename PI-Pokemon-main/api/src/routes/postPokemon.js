const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const router = Router();
const { validate } = require("../controllers/pokemonContoller");

router.post("/", async (req, res) => {
  await validate();
  try {
    const { name, hp, attack, defense, speed, height, weight, image, type } =
      req.body;

    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });
    for (let i = 0; i < type.length; i++) {
      const aux = {};
      console.log(type[i]);
      aux["type"] = type[i];
      const newType = await Type.findAll({ where: aux });
      console.log(newType);
      await newPokemon.addType(newType);
    }
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: "Error undefined" });
  }
});

module.exports = router;
