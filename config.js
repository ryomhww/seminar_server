require('dotenv').config();

module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'seminar_data',
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'mysecretjwtkey', 
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};