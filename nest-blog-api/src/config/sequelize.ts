import { getEnv } from "../helpers/common"

const config = ({
    dialect: getEnv('DB_DIALECT'),
    host: getEnv('DB_HOST'),
    database: getEnv('DB_DATABASE'),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    port: getEnv('DB_PORT'),
    schema: getEnv('DB_SCHEMA'),
    logging: true,
});

// using just "export" specifically for sequelize (export 
// default does not work)
export = {
    local: config,
    development: config,
    test: config,
    production: config,
}
