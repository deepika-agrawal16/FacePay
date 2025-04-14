import User from '../models/User.models.js';
import validator from 'validator';
import { hash, compare } from 'bcryptjs';
import transporter from '../config/mailer.js';
import otpStore from '../utils/otpStore.js';

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

    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
