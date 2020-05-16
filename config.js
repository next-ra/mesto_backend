const { NODE_ENV, JWT_SECRET, PORT } = process.env;

module.exports = {
  PORT: PORT || 3000,
  MONGODB: 'mongodb://localhost:27017/mestodb',
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
};
