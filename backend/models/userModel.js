import connection from '../config/mysql.js';

const userTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            cartdata JSON DEFAULT '{}'
        )
    `;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log('User table created successfully');
    });
};

userTable();

export default userTable;