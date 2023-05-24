import sql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const sqlConfig = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PWD as string,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_NAME as string,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};