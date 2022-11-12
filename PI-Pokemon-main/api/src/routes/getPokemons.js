const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  apiDB,
  getType,
  validate,
  pokemonDB,
} = require("../controllers/pokemonContoller");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  await validate();
  const { name } = req.query;
  try {
    if (name) {
      const pokemon = await pokemonDB();
      const pokeName = pokemon.filter((poke) =>
        poke.name.toLowerCase().includes(name.toLowerCase())
      );
      if (pokeName.length > 0) {
        res.status(200).json(pokeName);
      } else {
        res.status(400).json({ error: "Pokemon not found" });
      }
    } else {
      const data = await pokemonDB();
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  await validate();
  const { id } = req.params;

  try {
    const pokemon = await pokemonDB();
    if (id) {
      const pokeFilter = pokemon.filter((poke) => poke.id === parseInt(id));
      if (pokeFilter.length > 0) {
        res.status(200).json(pokeFilter);
      } else {
        res.status(400).json({ error: "ID not  found" });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
