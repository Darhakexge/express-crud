import Joi from 'joi';

const schema = Joi.object({
    APP_ENV: Joi.alternatives('local', 'development', 'testing', 'production'),
    APP_PORT: Joi.number().default(3000),
    MONGO_HOST: Joi.string().required(),
    MONGO_PORT: Joi.number().default(27017),
    MONGO_USER: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_DATABASE: Joi.string().required(),
}).required();

export default function validateEnv() {
    const { error, value: env } = schema.validate(process.env);

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return env;
}
