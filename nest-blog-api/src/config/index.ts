import { getEnv } from '../helpers/common';

export default () => ({
  app: {
    name: getEnv('APP_NAME'),
    port: getEnv('APP_PORT'),
    url: getEnv('APP_URL'),
    env: getEnv('APP_ENV'),
  },
});
