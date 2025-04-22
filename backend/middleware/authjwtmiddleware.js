import jwt from 'jsonwebtoken';
import User from '../models/User.models.js';

const jwtauthmiddleware = (req, res, next) => {
  // Get token from Authorization header: Bearer <token>
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Now you can access req.user.email or req.user.id
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export default jwtauthmiddleware;
