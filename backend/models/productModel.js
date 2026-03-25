import connection from '../config/mysql.js';

const productTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            image_url LONGTEXT DEFAULT '[]', -- Default to an empty JSON array
            category VARCHAR(255) NOT NULL,
            sub_category VARCHAR(255) NOT NULL,
            size VARCHAR(255) DEFAULT NULL, -- Allow NULL if sizes are optional
            bestseller BOOLEAN DEFAULT FALSE, -- Use BOOLEAN for better readability
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_category (category), -- Add index for category
            INDEX idx_sub_category (sub_category), -- Add index for sub_category
            INDEX idx_bestseller (bestseller) -- Add index for bestseller
        )
    `;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error creating products table:', err);
            return;
        }
        console.log('Product table created successfully');
    });
};

productTable();

export default productTable;