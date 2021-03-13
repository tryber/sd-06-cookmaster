const validateBody = (Body) => {
    if (!Body.name || !Body.ingredients || !Body.preparation) return true;
    return false;
};

module.exports = { validateBody };
