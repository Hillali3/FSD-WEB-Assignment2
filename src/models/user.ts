import mongoose, { Document, Schema } from 'mongoose';

// Define the user interface
export interface User extends Document {
  username: String, 
  name: String, 
  email: String,
  password: String,
  birthDate: Date
}

// Define the user schema
const userSchema: Schema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  birthDate: {
    type: Date,
    required: true
  }
});

// Create and export the User model
const User = mongoose.model<User>('User', userSchema);
export default User;
