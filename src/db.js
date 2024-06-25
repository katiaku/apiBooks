import { createPool } from 'mysql2';

export const pool = createPool({
    host: process.env.DB_HOST || 'sql7.freemysqlhosting.net',
    user: process.env.DB_USER || 'sql7716023',
    password: process.env.DB_PASSWORD || 'tFTbbZwJIz',
    database: process.env.DB_NAME || 'sql7716023',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
}).promise();

console.log('Connected to Database');


