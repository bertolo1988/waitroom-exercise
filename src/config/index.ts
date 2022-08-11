require('dotenv').config();

export const ServerConfig = {
  PORT: process.env.PORT || 3000,
  POSTGRES_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING,
};
