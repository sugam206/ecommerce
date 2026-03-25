import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import pool from '../config/mysql.js'; // Import MySQL connection pool

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const query = 'SELECT * FROM users WHERE email = ?';
        pool.query(query, [email], async (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ success: false, message: 'Invalid email' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }

            const token = generateToken(user.id);
            res.json({ success: true, token });
        });
    } catch (error) {
        console.error('Error in userLogin:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// User Registration
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        const checkQuery = 'SELECT * FROM users WHERE email = ?';
        pool.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            pool.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ success: false, message: 'Internal server error' });
                }

                const token = generateToken(result.insertId);
                res.status(201).json({ success: true, token });
            });
        });
    } catch (error) {
        console.error('Error in userRegister:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Check if admin credentials match environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email, password }, // Include email and password in the token payload
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );
            return res.json({ success: true, token });
        }

        res.status(401).json({ success: false, message: 'Invalid email or password' });
    } catch (error) {
        console.error('Error in adminLogin:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default { userLogin, userRegister, adminLogin };