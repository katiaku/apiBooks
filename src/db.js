import { createPool } from 'mysql2';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '7g30Icj5',
    database: 'AppBooks',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
}).promise();

console.log('Conexión con la BBDD creada');
