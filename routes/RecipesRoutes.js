const { Router } = require('express');
const multer = require('multer');
const RecipesController = require('../controllers/RecipesController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });
const recipesRouter = Router();

const recipesController = new RecipesController();

recipesRouter.get('/:id', recipesController.findById);

recipesRouter.put('/:id', verifyAuthorization, recipesController.update);

recipesRouter.delete('/:id', verifyAuthorization, recipesController.delete);

recipesRouter.post('/', verifyAuthorization, recipesController.create);

recipesRouter.put('/:id/image',
  verifyAuthorization,
  upload.single('image'),
  recipesController.uploadImage);

recipesRouter.get('/', recipesController.listAll);

module.exports = recipesRouter;