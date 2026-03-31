// db.js
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'logiconnect_db',
    password: 'your_password',
    port: 5432,
});
module.exports = { query: (text, params) => pool.query(text, params) };