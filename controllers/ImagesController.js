// const { Router } = require('express');
// const { ObjectId } = require('mongodb');
// const Recipes = require('../models/Recipes');

// const router = Router();

// const SUCCESS = 200;

// router.get('/', async (_req, res) => {
//   const user = await Recipes.getAll();

//   res.status(SUCCESS).json(user);
// });

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const recipe = await Recipes.getById(id);
  
//   const image = `localhost:3000/images/${recipe}.jpeg`;
  
//   console.log(image);

//   return res.status(SUCCESS).json(image);
// });

// module.exports = router;