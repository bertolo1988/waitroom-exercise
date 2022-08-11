require('dotenv').config();

export const ServerConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  POSTGRES_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING,
};
