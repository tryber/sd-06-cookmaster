const { Router } = require('express');
const { verifyAuth, recipesMiddlewares: recipes } = require('../middlewares');
const { recipesServices } = require('../services');
const { upload } = require('../middlewares');

const router = Router();

router.post('/', verifyAuth, recipes.verifyBodyRecipe, recipes.createRecipe);

router.get('/', recipes.listRecipes);

router.get('/:id', recipes.listForId);

router.put('/:id', verifyAuth, recipes.updateRecipe);

router.delete('/:id', verifyAuth, recipes.delRecipe);

router.put('/:id/image', verifyAuth, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    const urlImage = `localhost:3000/images/${filename}`;
    const updateRecipe = await recipesServices.updateImage(id, urlImage);
    return res.status(200).json(updateRecipe);
});

module.exports = router;
