module.exports = {
  jwt: {
    options: {
      expiresIn: '14d',
      algorithm: 'HS256',
    },
    secret: process.env.COOKMASTER_SECRET || 'elliuotataR',
  },
};
