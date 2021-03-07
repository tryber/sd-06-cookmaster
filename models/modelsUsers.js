const connection = require('./connection');

const findRegisterByEmail = async (email) => connection()
        .then((mongodb) => mongodb.collection('users').findOne({ email }));

const createUserInServer = async (name, email, password) => {
    const { insertedId } = await connection()
        .then((mongodb) => mongodb.collection('users').insertOne({ name, email, password }));

    return {
        user: {
            name,
            email,
            role: 'user',
            _id: insertedId,
        },
    };
};

// EXPORT MODELS FUNCTIONS 
module.exports = {
    findRegisterByEmail,
    createUserInServer,
};