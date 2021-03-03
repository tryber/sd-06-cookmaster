const multer = require('multer');
const controllers = require('../Controllers/recipeControllers');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images');
  },
  filename: (req, _file, callback) => {
    callback(null, req.params.id);
  },
});

const upload = multer({ storage });

module.exports = [upload.single('image'), async (req, res) => {
  const { path } = req.file;
  const id = req.originalUrl.slice(9, 33);

  await controllers.updatePath(id, path);

  const newRecipe = await controllers.findById(id);

  res.status(200).send(newRecipe);
}];
