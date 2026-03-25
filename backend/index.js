import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Load environment variables
import userRouter from './routes/userRoutes.js'; // Import userRouter
import productRouter from './routes/productRoutes.js'; // Import productRouter
import './models/productModel.js';
import './models/userModel.js';// Import productModel to execute productTable()

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Routes
app.use('/api/user', userRouter); // Use userRouter
app.use('/api/product', productRouter); // Use productRouter

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});