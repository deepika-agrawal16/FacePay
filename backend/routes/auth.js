// routes/auth.js
import { Router } from 'express';
import { registerUser, verifyOtp, loginUser, resendOtp,updateProfileImage } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/resend-otp', resendOtp);
router.put('/profile-image',  updateProfileImage);


export default router;
