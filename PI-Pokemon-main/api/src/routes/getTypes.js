const { Router } = require("express");
const { Type } = require("../db");
const { validate, getType } = require("../controllers/pokemonContoller");

const router = Router();

router.get("/", async (req, res) => {
  await validate();
  try {
    const typesPoke = await Type.findAll();
    res.status(200).json(typesPoke);
  } catch (error) {
    res.status(400).json({ error: "Types not found" });
  }
});

module.exports = router;
