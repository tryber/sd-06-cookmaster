import { Router } from 'express'
import { getAll, getById, create, remove, update } from '../models/recipes'
import {
  checkIfExist,
  checkNameIsValid,
} from '../services/basicChecks'
import { checkToken } from '../auth/checkToken'

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

recipesController.put('/:id', checkToken, (req, res) => {
  const userId =req.body.user['_id'];
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const entriesAreValid = checkIfExist(name) && checkIfExist(ingredients) && checkIfExist(preparation) && checkNameIsValid(name);

  if (!entriesAreValid) {
    const errorMsg = { message: "Invalid entries. Try again." };
    res.status(400).json(errorMsg)
  } else {
    update({ id, name, ingredients, preparation, userId })
      .then(r => res.status(200).json(r))
      .catch(error => res.status(400).json(error))
  }
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

recipesController.delete('/:id', checkToken, (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})


export default recipesController;