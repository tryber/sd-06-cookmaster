const { DeleteRecipeByIdDb } = require('../models/recipesModel');
const { searchUserByTokenDb } = require('../models/UserModel');

const UNAUTHORIZED = 401;

const verifyToken = (token, res) => {
    if (!token || token === null || token === undefined) {
        return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    }
};

const authenticateUser = (bodyUserDb, authorization, res) => {
    if (bodyUserDb === null || bodyUserDb.token !== authorization) {
        return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    }
};

const DeleteRecipeByIdService = async (id, req, res) => {
    const { authorization } = req.headers;

    verifyToken(authorization, res);

    const bodyUserDb = await searchUserByTokenDb(authorization);

    authenticateUser(bodyUserDb, authorization, res);

    const recipeById = await DeleteRecipeByIdDb(id);

    return recipeById;
};

module.exports = DeleteRecipeByIdService;
