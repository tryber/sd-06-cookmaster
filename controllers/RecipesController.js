const { Router } = require("express");
const Recipes = require('../services/RecipesServices');
const verifyAuthorization = require('../middlewares/verifyAuthorization');
const RecipesRouter  = Router();

RecipesRouter.get('/', async (req, res) => {
  try {
    const data = await Recipes.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Não Encontrado" });
  }
});



RecipesRouter.get('/:id', async (req, res) => {
  try {
    const data = await Recipes.getById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Não Encontrado" });
  }
});


RecipesRouter.post('/', verifyAuthorization ,async (req, res) => {
  try {
    const data = await Recipes.add(req.headers.authorization, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

RecipesRouter.put('/:id', verifyAuthorization, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const data = await Recipes.update(req.params.id, name, ingredients, preparation);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Não Encontrado" });
  }
});

RecipesRouter.delete('/:id', verifyAuthorization, async (req, res) => {
  try {
    const data = await Recipes.remove(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: "Não Encontrado" });
  }
});





module.exports = RecipesRouter;
