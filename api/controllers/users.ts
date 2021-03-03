import { Router } from 'express'
import { getAll, getById, create, remove, update } from '../models/users'
import {
  checkIfExist,
  checkEmailIsValid,
  checkNameIsValid,
  checkPasswordIsValid
} from '../services/basicChecks'

const usersController = Router();

usersController.post('/', (req, res) => {
  const { name, email, password } = req.body;
  const entriesAreValid = checkIfExist(email) && checkEmailIsValid(email) &&
    checkNameIsValid(name) && checkIfExist(password) && checkPasswordIsValid(password);

  if (!entriesAreValid) {
    const errorMsg = { message: "Invalid entries. Try again." };
    res.status(400).json(errorMsg)
  } else {
    create({ name, email, password })
      .then(r => res.status(201).json({ user: r }))
      .catch(error => res.status(409).json(error))
  }
})

usersController.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const entriesAreValid = checkIfExist(email) && checkEmailIsValid(email) &&
    checkNameIsValid(name) && checkIfExist(password) && checkPasswordIsValid(password);

  if (!entriesAreValid) {
    const errorMsg = { message: "Invalid entries. Try again." };
    res.status(400).json(errorMsg)
  } else {
    update({ id, name, email, password })
      .then(r => res.status(200).json(r))
      .catch(error => res.status(400).json(error))
  }
})

usersController.get('/:id', (req, res) => {
  const { id } = req.params;
  getById(id)
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})

usersController.get('/', (_req, res) => {
  getAll()
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})

usersController.delete('/:id', (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})


export default usersController;