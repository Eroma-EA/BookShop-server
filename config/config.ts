require('dotenv').config();

export const sequelizeConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect:"postgres",
    options: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
};

export const dialect="postgres"

export const validateConfig = () => {
    const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_PORT', 'DB_NAME'];
    requiredEnv.forEach(env => {
        if (!process.env[env]) {
            throw new Error(`Необходимая переменная среды ${env} отсутствует.`);
        }
    });
};