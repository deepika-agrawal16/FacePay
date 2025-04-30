// routes/auth.js
import { Router } from 'express';
import { registerUser, verifyOtp, loginUser, resendOtp,updateProfileImage,forgotPassword,resetPassword,getUserTransactions ,createTransaction } from '../controllers/authController.js';
import authjwtmiddleware from '../middleware/authjwtmiddleware.js'; 
const router = Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/resend-otp', resendOtp);
router.put('/profile-image',  updateProfileImage);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/transactions/create', authjwtmiddleware, createTransaction);
router.get('/transactions/history', authjwtmiddleware, getUserTransactions);

export default router;
