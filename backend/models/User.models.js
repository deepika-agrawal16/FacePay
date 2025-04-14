import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
 ,
 profileImage: {
  type: String,
},
 
 
}, { timestamps: true}

);

export default model('User', UserSchema);
