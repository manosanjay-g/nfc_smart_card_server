const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
}, {
    timestamps: true
});

const userCollection = mongoose.model('appointment', appointmentSchema, 'appointments')

module.exports = userCollection