const {
  create,
  findId,
  findEmail,
  getAll,
  update,
  remove } = require('../models/usersModel');

const createUser = async (user) => {
  const newUser = await create(user);
  return newUser;
};

const deleteProduct = async (id) => {
  try {
    return await remove(id);
  } catch (e) {
    console.log(e);
  }
};

const updateProduct = async (product) => {
  try {
    await update(product);
    return product;
  } catch (e) {
    console.log(e);
  }
};

const findProductById = async (id) => {
  try {
    const product = await findId(id);

    return product;
  } catch (e) {
    throw new Error(e);
  }
};

const findByEmail = async (email) => {
  const user = await findEmail(email);

  return user;
};

const getProducts = async () => {
  try {
    const products = await getAll();

    return products;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createUser,
  findProductById,
  findByEmail,
  getProducts,
  updateProduct,
  deleteProduct,
};
