import mysql from 'mysql';
import 'dotenv/config'; // Ensure environment variables are loaded

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Maximum number of connections in the pool
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        process.exit(1); // Exit the process if the connection fails
    }
    console.log('Connected to the database');
    connection.release(); // Release the connection back to the pool
});

export default pool;