import mongoose, { Schema } from 'mongoose'

const recipesSchema = new Schema({
  name: {
    type: String,
    uppercase: false,
    index: true,
    trim: true,
    required: true
  },
  ingredients: {
    type: String,
    uppercase: false,
    trim: true,
    required: true
  },
  preparation: {
    type: String,
    uppercase: false,
    trim: true,
    required: true
  },
  userId: {
    type: String,
    uppercase: false,
    index: true,
    required: true
  }
})

const Recipes = mongoose.model('Recipes', recipesSchema)


export const getAll = function() {
  return new Promise((resolve, reject) => {
    Recipes.find(function (err, recipes) {
      if (err) reject(err);
      else {
        resolve(
          recipes.map(recipe => {
            const { name, ingredients, preparation, _id, recipeId, userId } = recipe;
            return ({ name, ingredients, preparation, _id, recipeId, userId })
          }));
      }
    });
  })
};

export const getById = function(id: string) {
  return new Promise((resolve, reject) => {
    Recipes.findOne({ _id: id }, function (err, recipe) {
      if (err) reject(err);
      else if (recipe !== {}) {
        const { name, ingredients, preparation, _id, recipeId, userId } = recipe;
        resolve({ name, ingredients, preparation, _id, recipeId, userId })
      } else {
        resolve("recipe not found")
      }
    });
  })
};

export const getByUserId = function(userId: string) {
  return new Promise((resolve, reject) => {
    Recipes.findOne({ userId: userId }, function (err, recipe) {
      if (err) {
        reject(err);
      } else if (recipe !== null) {
        const { name, ingredients, preparation, _id, recipeId, userId } = recipe;
        resolve({ name, ingredients, preparation, _id, recipeId, userId })
      } else {
        resolve({})
      }
    });
  })
};

export const remove = function(id: string) {
  return new Promise((resolve, reject) => {
    Recipes.deleteOne({ _id: id }, function (err, recipe) {
      if (err) reject(err);
      else {
        const { name, ingredients, preparation, _id, recipeId, userId } = recipe;
        resolve({ name, ingredients, preparation, _id, recipeId, userId })
      }
    });
  })
};

export const create = function(recipe) {
  const { name, ingredients, preparation, userId } = recipe;
  return new Promise((resolve, reject) => {
    Recipes.create({ name, ingredients, preparation, userId }, function (err, recipe) {
      if (err) {
        reject(err); 
      } else {
        const { name, ingredients, preparation, _id, userId } = recipe;
        resolve({ name, ingredients, preparation, _id, userId })
      }
    });
  })
};

export const update = function(recipe) {
  const { id, name, ingredients, preparation, userId } = recipe;
  return new Promise((resolve, reject) => {
    Recipes.findOneAndUpdate({ _id: id },{ name, ingredients, preparation, userId },
    function (err, recipe) {
      if (err) reject(err);
      else {
        const { name, ingredients, preparation, _id, userId } = recipe;
        resolve({ name, ingredients, preparation, _id, userId })
      }
    });
  })
};

export default Recipes