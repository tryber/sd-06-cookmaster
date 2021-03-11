const { DeleteRecipeByIdDb } = require('../models/RecipesModel');
const { searchUserByTokenDb } = require('../models/UserModel');

const UNAUTHORIZED = 401;
const NO_CONTENT = 204;

// const verifyToken = (token, res) => {
//     if (!token || token === null || token === undefined) {
//         return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
//     }
// };

// const authenticateUser = (bodyUserDb, authorization, res) => {
//     if (bodyUserDb === null || bodyUserDb.token !== authorization) {
//         return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
//     }
// };

const DeleteRecipeByIdService = async (id, req, res) => {
    const { authorization } = req.headers;

    if (!authorization || authorization === null || authorization === undefined) {
        return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    }

    const bodyUserDb = await searchUserByTokenDb(authorization);

    if (bodyUserDb === null || bodyUserDb.token !== authorization) {
        return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
    }

    const recipeById = await DeleteRecipeByIdDb(id);

    return res.status(NO_CONTENT).json(recipeById);
};

module.exports = DeleteRecipeByIdService;
