const mariadb = require('mariadb');

const config = {
    host: '127.0.0.1',
    user: 'root',
    password: 'r00tP4asw0rd',
    database: 'pokemon_game',
    port: 3306,
    connectionLimit: 10,
};

// Crear el pool de conexiones
const pool = mariadb.createPool(config);

// Exportar el pool (sin paréntesis)
module.exports = pool;
