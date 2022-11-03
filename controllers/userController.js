const appointmentModel = require("../models/appointmentModel")
//Patient related functions

const getUpcomingAppointments = async (req, res) => {
    try {
        const { patient_id } = req.body
        const appointment = await appointmentModel.find({ patient_id })
        return res.status(200).json({
            appointment_res: appointment
        })
    } catch (err) {
        console.log(err);
    }
}

const getUserInfo = async (req, res) => {
    try {
        const uid = req.params.id;
        if (!uid) {
            res.status(400).json({
                error: "uid is required to find the user"
            })
        }
        const user = await userModel.findOne({ uid });
        if (user == null) {
            return res.status(400).json({
                error: "User does not exist"
            })
        } else {
            return res.status(200).json({
                user
            })
        }
    } catch (err) {
        console.log(err);
    }
}


const getRecentVisits = async (req, res) => {
    try {
        const { patient_id } = req.body
        const appointment = await appointmentModel.find({ patient_id: patient_id, date: { $lte: new Date().toISOString() } })
        return res.status(200).json({
            appointment_res: appointment
        })
    } catch (err) {
        console.log(err);
    }
}
const getDoctorUpcomingAppointments = async (req, res) => {
    try {
        const { patient_id } = req.body
        const appointment = await appointmentModel.find({ doctor_id })
        return res.status(200).json({
            appointment_res: appointment
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getRecentVisits,
    getUpcomingAppointments,
    getDoctorUpcomingAppointments,
    getUserInfo
}