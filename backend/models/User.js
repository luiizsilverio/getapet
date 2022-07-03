const mongoose = require('../db/conn')
const { Schema } = mongoose

// Cria o Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    image: {
        type: String
    },
    phone: {
        type: String,
        required: true
    }    
})

// Cria o Model
const User = mongoose.Model("User", UserSchema, { timestamps: true })

module.exports = User