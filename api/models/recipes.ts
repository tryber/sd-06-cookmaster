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
  },
  image: {
    type: String,
    uppercase: false,
    default: ''
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
            const { name, ingredients, preparation, _id,  userId, image } = recipe;
            return ({ name, ingredients, preparation, _id,  userId, image })
          }));
      }
    });
  })
};

export const getById = function(id: string) {
  return new Promise((resolve, reject) => {
    Recipes.findOne({ _id: id }, function (err, recipe) {
      if (err) reject({ message: 'recipe not found' });
      else {
        const { name, ingredients, preparation, _id, userId, image  } = recipe;
        resolve({ name, ingredients, preparation, _id, userId, image })
      }
    });
  })
};

export const remove = function(id: string) {
  return new Promise((resolve, reject) => {
    Recipes.deleteOne({ _id: id }, function (err, recipe) {
      if (err) reject(err);
      else {
        const { name, ingredients, preparation, _id,  userId, image } = recipe;
        resolve({ name, ingredients, preparation, _id,  userId, image })
      }
    });
  })
};

export const create = function(recipeInput) {
  const { name, ingredients, preparation, userId } = recipeInput;
  return new Promise((resolve, reject) => {
    Recipes.create({ name, ingredients, preparation, userId }, function (err, recipe) {
      if (err) {
        reject(err); 
      } else {
        const { name, ingredients, preparation, _id, userId, image } = recipe;
        resolve({ name, ingredients, preparation, _id, userId, image })
      }
    });
  })
};

export const update = function(recipeInput) {
  const { id, name, ingredients, preparation, image } = recipeInput;
  return new Promise((resolve, reject) => {
    Recipes.findOneAndUpdate({ _id: id },{ name, ingredients, preparation, image },
    function (err, recipe) {
      if (err) reject(err);
      else {
        const { _id, userId } = recipe;
        resolve({ name, ingredients, preparation, _id, userId, image })
      }
    });
  })
};

export const updateImg = function(recipeInput) {
  const { id, image } = recipeInput;
  return new Promise((resolve, reject) => {
    Recipes.findOneAndUpdate({ _id: id }, { image },
    function (err, recipe) {
      if (err) reject(err);
      else {
        const { _id, userId, name, ingredients, preparation } = recipe;
        resolve({ name, ingredients, preparation, _id, userId, image })
      }
    });
  })
};

export default Recipes