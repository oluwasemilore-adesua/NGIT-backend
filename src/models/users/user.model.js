const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim:true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true,
        lowercase: true,
        trim:true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min:[0, "Age cannot be negative"],
        max:[120, "Age cannot be greater than 120"],
    },
    status :{
        type: String,
        enum: ["active", "inactive", "pending"],
        default: "active",
    }, 
     avatar: {
        type: String,
        default: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
     },
    }, {
        timestamps: true},   
        
);
const User = mongoose.model("User", userSchema);

module.exports = User; 