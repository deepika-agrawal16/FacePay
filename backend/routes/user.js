
// routes/userRoutes.js
import express from 'express';
import User from '../models/User.models.js';

const router = express.Router();

// Get current user details (using hardcoded email for now)
router.get('/me', async (req, res) => {
  try {
    const email = "deepikaagrawal1572@gmail.com"; // Replace with JWT-based req.user.email later
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload or update profile image
router.put('/profile-image', async (req, res) => {
  try {
    const email = "deepikaagrawal1572@gmail.com"; // Replace with JWT session later
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'Image data is required' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { profileImage: image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile image updated successfully', image: updatedUser.profileImage });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

