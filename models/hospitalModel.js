const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    registeredAs: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    doc: { type: String, required: true },
    mobile: { type: String, required: true },
    add1: { type: String, required: true },
    add2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
}, {
    timestamps: true
});

const hospitalCollection = mongoose.model('hospital', hospitalSchema, 'hospitals')

module.exports = hospitalCollection