import pool from '../config/mysql.js';
import cloudinary from '../config/cloudinary.js';

const fallbackImage = 'https://via.placeholder.com/150';

const parseJsonArray = (value, fallback = []) => {
    if (!value) return fallback;

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch (error) {
        return fallback;
    }
};

const normalizeProduct = (product) => {
    const images = parseJsonArray(product.image_url, [fallbackImage]);
    const sizes = parseJsonArray(product.size, []);

    return {
        ...product,
        _id: String(product.id),
        image: images,
        image_url: images,
        sizes,
        size: sizes,
        subCategory: product.sub_category,
        bestSeller: Boolean(product.bestseller),
    };
};

const add = async (req, res) => {
    try {
        const { name, description, price, category, sub_category, size, bestseller } = req.body;

        // Ensure files are uploaded
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ success: false, message: 'No files were uploaded' });
        }

        // Log uploaded files
        console.log('Uploaded Files:', req.files);

        // Handle uploaded files
        const images = Object.values(req.files).map((fileArray) => fileArray[0].path);
        console.log('Image Paths:', images);

        // Upload images to Cloudinary
        const imageUrls = await Promise.all(
            images.map(async (filePath) => {
                try {
                    const result = await cloudinary.uploader.upload(filePath);
                    console.log('Uploaded Image URL:', result.url);
                    return result.url;
                } catch (uploadError) {
                    console.error('Error uploading to Cloudinary:', uploadError);
                    throw uploadError;
                }
            })
        );

        // Insert product into the database
        const query = `
            INSERT INTO products (name, description, price, category, sub_category, size, bestseller, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            name,
            description,
            parseFloat(price),
            category,
            sub_category,
            size,
            bestseller === 'true' || bestseller === '1' || bestseller === 1,
            JSON.stringify(imageUrls),
        ];

        pool.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting product into database:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
            res.json({ success: true, message: 'Product added successfully' });
        });
    } catch (error) {
        console.error('Error in addProduct:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



// List all products
const list = async (req, res) => {
    const query = 'SELECT * FROM products';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        const products = results.map(normalizeProduct);

        res.json({ success: true, products });
    });
};
// Remove a product by ID
const remove = async (req, res) => {
    const { id } = req.query;
    console.log("Deleting product with ID:", id); // Log the ID
    const query = 'DELETE FROM products WHERE id = ?';
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        console.log("Query Result:", result); // Log the query result
        res.json({ success: true, message: 'Product deleted successfully' });
    });
};

// Get a single product by ID
const single = async (req, res) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    pool.query(query, [req.query.productId], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product: normalizeProduct(results[0]) });
    });
};

export default { add, list, remove, single };
