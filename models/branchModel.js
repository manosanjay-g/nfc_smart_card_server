const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    doi: { type: String, required: true },
    mobile: { type: String, required: true },
    add1: { type: String, required: true },
    add2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    hospital_id: { type: String, required: true }
}, {
    timestamps: true
});

const branchCollection = mongoose.model('branch', branchSchema, 'branches')

module.exports = branchCollection