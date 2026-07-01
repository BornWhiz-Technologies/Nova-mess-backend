require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mess-nova',
  JWT_SECRET: process.env.JWT_SECRET || 'mess_nova_super_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d'
};
