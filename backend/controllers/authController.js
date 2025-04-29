import User from '../models/User.models.js';
import validator from 'validator';
import { hash, compare } from 'bcryptjs';
// import bcrypt from 'bcryptjs';  // Then use bcrypt.hash()
import transporter from '../config/mailer.js';
import otpStore from '../utils/otpStore.js';
import cloudinary from '../cloudinary.js';
import jwt from 'jsonwebtoken';
import jwtauthmiddleware from '../middleware/authjwtmiddleware.js';
import Transaction from '../models/Transactions.js';


// =========================================
// REGISTER - Send OTP
// =========================================
export const registerUser = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  // Input Validation
  if (!username || !email || !phoneNumber || !password)
    return res.status(400).json({ message: 'All fields are required' });

  if (!validator.isEmail(email))
    return res.status(400).json({ message: 'Invalid email format' });

  if (!validator.isMobilePhone(phoneNumber, 'any'))
    return res.status(400).json({ message: 'Invalid phone number' });

  if (password.length < 8)
    return res.status(400).json({ message: 'Password must be at least 8 characters' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists with this email' });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpData = {
      otp,
      userData: { username, email, phoneNumber, password },
      createdAt: Date.now()
    };
    otpStore.set(email, otpData);

    // Send OTP via email
    await transporter.sendMail({
      to: email,
      subject: 'FacePay OTP Verification',
      html: `<p>Your OTP for FacePay registration is <strong>${otp}</strong>. It expires in 10 minutes.</p>`
    });

    res.status(200).json({ message: 'OTP sent to your email' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =========================================
// VERIFY OTP
// =========================================
// export const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   const record = otpStore.get(email);

//   if (!record)
//     return res.status(400).json({ message: 'OTP expired or not found' });

//   const isValidOtp = record.otp === otp;
//   const isExpired = Date.now() - record.createdAt > 10 * 60 * 1000; // 10 mins

//   if (!isValidOtp || isExpired) {
//     otpStore.delete(email);
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   try {
//     const { username, phoneNumber, password } = record.userData;
//     const hashedPassword = await hash(password, 10);

//     const newUser = new User({
//       username,
//       email,
//       phoneNumber,
//       password: hashedPassword
//     });

//     await newUser.save();
//     otpStore.delete(email);

//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// ==============================
// VERIFY OTP CONTROLLER
// ==============================
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record) {
    return res.status(400).json({ message: 'OTP expired or not found' });
  }

  const isExpired = Date.now() - record.createdAt > 10 * 60 * 1000;
  if (isExpired) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
  }

  try {
    const { username, phoneNumber, password } = record.userData;
    const hashedPassword = await hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please login.' });
    }

    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();
    otpStore.delete(email);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error. Please try again.' });
  }
};



// =========================================
// RESEND OTP
// =========================================
// export const resendOtp = async (req, res) => {
//   const { email } = req.body;

//   // Check if OTP was sent previously and is expired
//   const existingOtpData = otpStore.get(email);
//   if (!existingOtpData) {
//     return res.status(400).json({ message: 'No OTP request found. Please register first.' });
//   }

//   const isExpired = Date.now() - existingOtpData.createdAt > 10 * 60 * 1000; // 10 mins

//   if (!isExpired) {
//     return res.status(400).json({ message: 'OTP is still valid. Please check your email.' });
//   }

//   try {
//     // Generate new OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     existingOtpData.otp = otp;
//     existingOtpData.createdAt = Date.now(); // Reset timestamp

//     // Store new OTP data
//     otpStore.set(email, existingOtpData);

//     // Send new OTP via email
//     await transporter.sendMail({
//       to: email,
//       subject: 'FacePay OTP Resend',
//       html: `<p>Your new OTP for FacePay registration is <strong>${otp}</strong>. It expires in 10 minutes.</p>`
//     });

//     res.status(200).json({ message: 'OTP resent to your email' });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// ==============================
// RESEND OTP CONTROLLER
// ==============================
export const resendOtp = async (req, res) => {
  const { email } = req.body;

  const existingOtpData = otpStore.get(email);
  if (!existingOtpData) {
    return res.status(400).json({ message: 'No OTP request found. Please register first.' });
  }

  const isExpired = Date.now() - existingOtpData.createdAt > 10 * 60 * 1000;
  if (!isExpired) {
    return res.status(400).json({ message: 'OTP is still valid. Please check your email.' });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    existingOtpData.otp = otp;
    existingOtpData.createdAt = Date.now();

    otpStore.set(email, existingOtpData);

    await transporter.sendMail({
      to: email,
      subject: 'FacePay OTP Resend',
      html: `<p>Your new OTP for FacePay registration is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });

    return res.status(200).json({ message: 'OTP resent to your email' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to resend OTP. Please try again.' });
  }
};



// =========================================
// LOGIN
// =========================================
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage
      },
      process.env.JWT_SECRET,
    );

    res.status(200).json({ message: 'Login successful',token,
       user: { 
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,  // Include profile image in the response
    } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =========================================
// Set profile imah
// =========================================

export const updateProfileImage = async (req, res) => {
  
  try {
    const { email, image_url } = req.body; 

    const cloudinary_res = await cloudinary.uploader.upload(image_url, {
      folder:"/demo",
  
    });
    

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { profileImage: cloudinary_res.url },
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, image_url: cloudinary_res.url  });

  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update profile image' });
  }
};

// =========================================
// Forgot Password
// =========================================

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '❗ Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: '❗ User not found with this email address' });
    }

    // Generate token valid for 15 minutes
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Prepare reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🔐 Password Reset Request',
      html: `
        <h3>Password Reset</h3>
        <p>Hello ${user.username},</p>
        <p>You requested to reset your password. Please click the link below:</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
        <p>This link is valid for 15 minutes.</p>
      `,
    });

    res.status(200).json({ message: '✅ Reset password link has been sent to your email' });

  } catch (error) {
    console.error('❌ Forgot password error:', error);

    if (error.response && error.response.status) {
      // Nodemailer-related error
      return res.status(500).json({ message: `Email service error: ${error.response.status}` });
    }

    res.status(500).json({ message: `❌ Server error: ${error.message}` });
  }
};

// =========================================
// Reset Password
// =========================================

// In your auth controller (auth.js)

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body; // Changed from newPassword to password

  // Proper password validation
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ 
      message: 'Password must be at least 8 characters',
      receivedLength: password.length // For debugging
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);
    
    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error('Password reset error:', {
      error: error.message,
      stack: error.stack,
      token: token,
      body: req.body
    });

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Reset link has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    return res.status(500).json({ 
      message: 'Password reset failed',
      error: error.message 
    });
  }
};

// =========================================
// Transction History
// =========================================


// Add these to your existing exports
export const createTransaction = async (req, res) => {
  try {
    const { receiverPhoneNumber, amount } = req.body;
    const userId = req.user.id;

    const newTxn = await Transaction.create({
      sender: userId,
      receiverPhoneNumber,
      amount,
      status: 'completed' // Assuming face recognition passes
    });

    res.status(201).json({ 
      success: true,
      message: 'Transaction created successfully', 
      transaction: newTxn 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error creating transaction',
      error: error.message 
    });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ sender: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ 
      success: true,
      transactions 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error fetching transactions',
      error: error.message 
    });
  }
};

