const { uploadDB } = require('../models/mongoDbRequests');

const connectionUsers = 'users';

const registerUser = async (body) => {
  const copyBodyAddRole = { ...body, role: 'user' };
  
  try {
    await uploadDB(connectionUsers, copyBodyAddRole);
    const user = copyBodyAddRole;
    return { user };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  registerUser,
};
