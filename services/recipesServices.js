const jwt = require('jsonwebtoken');

const { secret } = require('../controller/loginController');
const { createRecipe, getAllRecipes } = require('../model/recipesModel');
const { findOneUser } = require('../model/usersModel');

const code400 = 400;
const code401 = 401;

// 4 - Crie um endpoint para a listagem de receitas
// Será validado que é possível listar todas as receitas sem estar autenticado
// Será validado que é possível listar todas as receitas estando autenticado

const getRecipes = async () => getAllRecipes();
const createNewRecipe = async (data) => createRecipe(data);

// 3 - Crie um endpoint para o cadastro de receitas

// Será validado que não é possível cadastrar uma receita com token invalido
// Se a receita não tiver o token válido o resultado retornado deverá ser
// conforme exibido abaixo, com um status http 401

const validateToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await findOneUser(decoded.data.email);

    if (!user) {
      return res.status(code401).json({ message: 'jwt malformed' });
    }

    req.user = decoded.data;
  } catch (err) {
    return res.status(code401).json({ message: 'jwt malformed' });
  }

  next();
};

// 3 - Crie um endpoint para o cadastro de receitas

// Será validado que não é possível cadastrar receita sem o campo "name"
// Se a receita não tiver o campo "name" o resultado retornado deverá ser
// conforme exibido abaixo, com um status http 400

// Será validado que não é possível cadastrar receita sem o campo "ingredients"
// Se a receita não tiver o campo "ingredients" o resultado retornado deverá ser
// conforme exibido abaixo, com um status http 400

// Será validado que não é possível cadastrar receita sem o campo "preparation"
// Se a receita não tiver o campo "preparation" o resultado retornado deverá ser
// conforme exibido abaixo, com um status http 400

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(code400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

module.exports = {
  createNewRecipe,
  validateRecipe,
  getRecipes,
  validateToken,
};
