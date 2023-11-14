import { Schema,models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required "],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please enter a valid email",
    ],
  },
  
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },

  fullname: {
    type: String,
    required: [true, "Fullname is required"],
    minLength: [3, "Fullname must be at least 3 characters"],
    maxLength: [30, "Fulname must be at most 30 characters"],
  },
});

const User = models.User || model('User',userSchema, 'users')
export default User    
