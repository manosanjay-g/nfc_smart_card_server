const appointmentModel = require('../models/appointmentModel')

const addAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, time, date, desc, title } = req.body;
        if (!(patient_id && doctor_id && time && date, desc, title)) {
            return res.status(400).json({
                error: "All input are required"
            })
        }
        const oldUser = await appointmentModel.findOne({ date, time });
        if (oldUser) {
            return res.status(409).json({
                error: "Appointment already exists on the time and date"
            })
        }

        encryptedPassword = await bcrypt.hash(password, 15);

        const appointment = await userModel.create({
            patient_id,
            doctor_id,
            time,
            date,
            desc,
            title
        });
        res.status(201).json({
            appointment_res: appointment,
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addAppointment
}