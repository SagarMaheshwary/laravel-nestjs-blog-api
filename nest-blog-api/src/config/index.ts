import { getEnv } from '../helpers/common';

export default () => ({
  app: {
    name: getEnv('APP_NAME'),
    port: getEnv('APP_PORT'),
    url: getEnv('APP_URL'),
    env: getEnv('NODE_ENV'),
  },
  database: {
    dialect: getEnv('DB_DIALECT'),
    host: getEnv('DB_HOST'),
    database: getEnv('DB_DATABASE'),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    port: Number(getEnv('DB_PORT')),
    schema: getEnv('DB_SCHEMA'),
    logging: JSON.parse(getEnv('DB_LOGGING')),
  },
  jwt: {
    secret: getEnv('JWT_SECRET'),
    expiry: getEnv('JWT_EXPIRY', '3600'),
    algorithm: getEnv('JWT_ALGORITHM'),
  },
});
