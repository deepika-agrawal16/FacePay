#  FacePay - Facial Recognition Based Payment System

FacePay is a modern and secure web-based payment platform that enables users to authenticate and authorize transactions using facial recognition. The system aims to provide a seamless and contactless payment experience, replacing traditional PINs and passwords with biometric verification.

---

## 🚀 Features

- 👤 User Registration with Email OTP verification
- 🔐 Secure Login using JWT tokens
- 📷 Facial recognition for transaction verification (OpenCV + Python backend)
- 💳 UPI/Bank-to-Bank Transactions
- 📬 Password reset with email OTP
- 🖼 Upload Profile Images (via Cloudinary)
- 📊 User Dashboard with transaction history
- 🌐 RESTful API structure (Express.js)
- ☁️ MongoDB for flexible data storage

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- JavaScript

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Bcrypt for password hashing

### Utilities:
- Nodemailer for email OTP
- OpenCV (Python) for facial recognition
- Cloudinary for image storage

---

## 📥 Installation Guide

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/facepay.git
cd facepay
```
###  2️⃣ Setup Backend
```
cd backend
npm install

Create a .env file inside the /backend folder and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password

then start backend server:-
npm start

```
### 3️⃣ Setup Frontend
```
cd ../frontend
npm install
npm start
```



