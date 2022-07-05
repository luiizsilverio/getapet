const mongoose = require('../db/conn')
// const { Schema } = mongoose

// Cria o Schema
const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    available: {
        type: Boolean
    },
    user: Object,
    adopter: Object
},
  { timestamps: true }
)

// Cria o Model
const User = mongoose.model("Pet", PetSchema)

module.exports = Pet
