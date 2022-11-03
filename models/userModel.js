const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registeredAs: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
    mobile: { type: String, required: true },
    add1: { type: String, required: true },
    add2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
}, {
    timestamps: true
});

const userCollection = mongoose.model('user', userSchema, 'users')

module.exports = userCollection