import { Router } from 'express'
import { getAll, getById, create, remove, update, updateImg } from '../models/recipes'
import { checkIfExist, checkNameIsValid } from '../services/basicChecks'
import { checkToken } from '../auth/checkToken'
import multer from 'multer'
import path from 'path'

const recipesController = Router();

recipesController.post('/', checkToken, (req, res) => {
  const userId =req.user._id;
  const { name, ingredients, preparation } = req.body;
  const entriesAreValid = checkIfExist(name) && checkIfExist(ingredients) && checkIfExist(preparation) && checkNameIsValid(name);

  if (!entriesAreValid) {
    const errorMsg = { message: "Invalid entries. Try again." };
    res.status(400).json(errorMsg)
  } else {
    create({ name, ingredients, preparation, userId })
      .then(r => res.status(201).json({ recipe: r }))
      .catch(error => res.status(409).json(error))
  }
})

recipesController.put('/:id/image', checkToken, async (req, res) => {
  const userRole = req.user.role;
  const userId = req.user._id;

  if (userRole !== 'user' && userRole !== 'admin') {
    const errorMsg = { message: 'permission denied' };
    return res.status(400).json(errorMsg)
  }

  const { id } = req.params;
  const recipe = await getById(id)
  
  if (userRole === 'user' && recipe.userId != userId) {
    const errorMsg = { message: 'permission denied' };
    return res.status(400).json(errorMsg)
  }

  const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'uploads'),
    filename: (req, file, callback) => callback(null, `${id}.${path.extname(file.originalname)}`),
  });

  const uploadImg = () => new Promise((resolve) => {
    const upload = multer({ storage })

    upload.single('image')(req, res, () => {
      const image = process.env.BASE_URL + '/images/' + id + path.extname(req.file.filename);
      resolve(image)
    })
  });

  uploadImg().then(image => {
    updateImg({ id, image })
      .then(r => res.status(200).json(r))
      .catch(error => res.status(400).json(error))
  })
})

recipesController.put('/:id', checkToken, async (req, res) => {
  const userRole = req.user.role;
  const userId = req.user._id;

  if (userRole !== 'user' && userRole !== 'admin') {
    const errorMsg = { message: 'permission denied' };
    return res.status(400).json(errorMsg)
  }
  
  const { id } = req.params;

  if (userRole === 'user') {
    const recipe = await getById(id);
    if (recipe == "not found") return res.status(400).json(recipe);

    if (recipe.userId != userId) {
      const errorMsg = { message: 'permission denied' };
      return res.status(400).json(errorMsg)
    }
  }

  const { name, ingredients, preparation } = req.body;
  const entriesAreValid = checkIfExist(name) && checkIfExist(ingredients) && checkIfExist(preparation) && checkNameIsValid(name);

  if (!entriesAreValid) {
    const errorMsg = { message: "Invalid entries. Try again." };
    return res.status(400).json(errorMsg)
  }

  update({ id, name, ingredients, preparation })
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})

recipesController.get('/:id', (req, res) => {
  const { id } = req.params;
  getById(id)
    .then(r => res.status(200).json(r))
    .catch(error => res.status(404).json(error))
})

recipesController.get('/', (_req, res) => {
  getAll()
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})

recipesController.delete('/:id', checkToken, async (req, res) => {
  const userRole = req.user.role;
  const userId = req.user._id;

  if (userRole !== 'user' && userRole !== 'admin') {
    const errorMsg = { message: 'permission denied' };
    return res.status(400).json(errorMsg)
  }
  
  const { id } = req.params;

  if (userRole === 'user') {
    const recipe = await getById(id)
    if (recipe.userId != userId) {
      const errorMsg = { message: 'permission denied' };
      return res.status(400).json(errorMsg)
    }
  }

  remove(id)
    .then(r => res.status(204).json())
    .catch(error => res.status(400).json(error))
})


export default recipesController;