const hospitalModel = require('../models/hospitalModel')
const userModel = require('../models/userModel')
const branchModel = require('../models/branchModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    try {
        const { name, email, password, registeredAs, doc, mobile, add1, add2, city, state } = req.body;
        if (!(email && name && password && registeredAs && doc && mobile && add1 && add2 && city && state)) {
            return res.status(400).json({
                error: "All input are required"
            })
        }
        const oldHospital = await hospitalModel.findOne({ email });
        if (oldHospital) {
            return res.status(409).json({
                error: "User already exists"
            })
        }

        encryptedPassword = await bcrypt.hash(password, 15);

        const hospital = await hospitalModel.create({
            name,
            registeredAs,
            email: email.toLowerCase(),
            password: encryptedPassword,
            doc,
            mobile,
            add1,
            add2,
            city,
            state
        });

        const token = jwt.sign({
            user_id: hospital._id,
            email
        }, process.env.JWT_KEY);
        hospital.token = token;
        res.status(201).json({
            hospital_res: hospital,
        })
    } catch (err) {
        console.log(err);
    }
}

const hospitalLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({
                error: "All inputs are required"
            })
        }
        const hospital = await hospitalModel.findOne({ email });
        if (hospital == null) {
            return res.status(400).json({
                error: "Hospital does not exist"
            })
        }

        const decryptedPassword = await bcrypt.compare(password, hospital.password);
        if (hospital && decryptedPassword) {
            const token = jwt.sign({
                user_id: hospital._id,
                email
            }, process.env.JWT_KEY)
            hospital.token = token;
            return res.status(200).json({
                res: hospital
            });
        }
        res.status(400).json({
            error: "Invalid Credentials"
        })
    } catch (err) {
        console.log(err);
    }
}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({
                error: "All inputs are required"
            })
        }
        const user = await userModel.findOne({ email });
        if (user == null) {
            return res.status(400).json({
                error: "User does not exist"
            })
        }

        const decryptedPassword = await bcrypt.compare(password, user.password);
        if (user && decryptedPassword) {
            const token = jwt.sign({
                user_id: user._id,
                email
            }, process.env.JWT_KEY)
            user.token = token;
            return res.status(200).json({
                res: user
            });
        }
        res.status(400).json({
            error: "Invalid Credentials"
        })
    } catch (err) {
        console.log(err);
    }
}
const branchLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({
                error: "All inputs are required"
            })
        }
        const branch = await branchModel.findOne({ email });
        if (branch == null) {
            return res.status(400).json({
                error: "branch does not exist"
            })
        }

        const decryptedPassword = await bcrypt.compare(password, branch.password);
        if (branch && decryptedPassword) {
            const token = jwt.sign({
                user_id: branch._id,
                email
            }, process.env.JWT_KEY)
            branch.token = token;
            return res.status(200).json({
                res: branch
            });
        }
        res.status(400).json({
            error: "Invalid Credentials"
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    register,
    hospitalLogin,
    userLogin,
    branchLogin
}
