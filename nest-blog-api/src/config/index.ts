import { getEnv } from '../helpers/common';

export default () => ({
  app: {
    name: getEnv('APP_NAME'),
    port: getEnv('APP_PORT'),
    url: getEnv('APP_URL'),
    env: getEnv('APP_ENV'),
  },
  database: {
    dialect: getEnv('DB_DIALECT'),
    host: getEnv('DB_HOST'),
    db: getEnv('DB_DATABASE'),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    port: getEnv('DB_PORT'),
    schema: getEnv('DB_SCHEMA'),
  }
});
