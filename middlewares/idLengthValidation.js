const { status, messages } = require('../util/dataStatus');

const { NotFound } = status;
const { recipeNotFound } = messages;

const idLengthValidation = async (req, res, next) => {
    const { id } = req.params;

    // MAGIC NUMBER
    const magicNumber = {
        idValid: 24,
    };

    // Validations
    if (id.length !== magicNumber.idValid) {
        return res.status(NotFound).json(recipeNotFound);
    } 

    // Go to Services
    next();
};

module.exports = {
    idLengthValidation,
};