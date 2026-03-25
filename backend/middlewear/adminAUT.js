import jwt from 'jsonwebtoken';

const adminAUT = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Token not found or invalid format' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token contains the correct admin email and password
        if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: 'Invalid token or unauthorized access' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in adminAUT middleware:', error);
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default adminAUT;