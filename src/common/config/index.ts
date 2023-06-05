import validateEnv from 'src/common/config/envSchema';

const env = validateEnv();

export interface Config {
    app: {
        environment: string;
        port: number;
    };
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    };
}

const config: Config = {
    app: {
        environment: env.APP_ENV,
        port: env.APP_PORT,
    },
    database: {
        host: env.MONGO_HOST,
        port: env.MONGO_PORT,
        user: env.MONGO_USER,
        password: env.MONGO_PASSWORD,
        database: env.MONGO_DATABASE,
    },
};

Object.freeze(config);

export default config;
