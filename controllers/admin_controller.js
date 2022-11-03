const userModel = require('../models/userModel');
const branchModel = require('../models/branchModel');
const hospitalModel = require('../models/hospitalModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//User Methods
const readUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).json({
            users: users
        })
    } catch (err) {

    }
}
const addUser = async (req, res) => {
    try {
        const { name, email, password, registeredAs, dob, mobile, username, add1, add2, city, state } = req.body;
        if (!(email && name && password && registeredAs && dob && mobile && add1 && add2 && city && state)) {
            return res.status(400).json({
                error: "All input are required"
            })
        }
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            return res.status(409).json({
                error: "User already exists"
            })
        }

        encryptedPassword = await bcrypt.hash(password, 15);

        const user = await userModel.create({
            username,
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            registeredAs,
            dob,
            mobile,
            add1,
            add2,
            city,
            state,
        });

        const token = jwt.sign({
            user_id: user._id,
            email
        }, process.env.JWT_KEY);
        user.token = token;
        res.status(201).json({
            user_res: user,
        })
    } catch (err) {
        console.log(err);
    }
}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email, password, registeredAs, dob, mobile, username, add1, add2, city, state } = req.body;
        if (!(email && name && password && registeredAs && dob && mobile && add1 && add2 && city && state)) {
            return res.status(400).json({
                error: "All input are required"
            })
        }

        encryptedPassword = await bcrypt.hash(password, 15);

        const user = await userModel.findByIdAndUpdate({ _id: id }, {
            username,
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            registeredAs,
            dob,
            mobile,
            add1,
            add2,
            city,
            state
        });

        const token = jwt.sign({
            user_id: user._id,
            email
        }, process.env.JWT_KEY);
        user.token = token;
        res.status(201).json({
            user_res: user,
        })
    } catch (err) {
        console.log(err);
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await userModel.deleteOne({ _id: id })
        res.status(200).json({ user: deletedUser })
    } catch (err) {
        console.log(err);
    }
}

//Hospital Methods
const addHospital = async (req, res) => {
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
                error: "Hospital already exists"
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

//Branch Methods
const readBranches = async (req, res) => {
    try {
        const branches = await branchModel.find({})
        return res.status(200).json({
            branches: branches
        })
    } catch (err) {

    }
}
const addBranch = async (req, res) => {
    try {
        const { name, email, password, doi, mobile, username, add1, add2, city, state, hospital_id } = req.body;
        if (!(email && name && password && doi && mobile && add1 && add2 && city && state && hospital_id)) {
            return res.status(400).json({
                error: "All input are required"
            })
        }
        const oldBranch = await branchModel.findOne({ email });
        if (oldBranch) {
            return res.status(409).json({
                error: "Branch already exists"
            })
        }

        encryptedPassword = await bcrypt.hash(password, 15);

        const branch = await branchModel.create({
            username,
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            doi,
            mobile,
            add1,
            add2,
            city,
            state,
            hospital_id
        });

        const token = jwt.sign({
            user_id: branch._id,
            email
        }, process.env.JWT_KEY);
        branch.token = token;
        res.status(201).json({
            branch_res: branch,
        })
    } catch (err) {
        console.log(err);
    }
}
const updateBranch = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email, password, doi, mobile, username, add1, add2, city, state } = req.body;
        if (!(email && name && password && doi && mobile && add1 && add2 && city && state)) {
            return res.status(400).json({
                error: "All input are required"
            })
        }

        encryptedPassword = await bcrypt.hash(password, 15);

        const user = await branchModel.findByIdAndUpdate({ _id: id }, {
            username,
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            doi,
            mobile,
            add1,
            add2,
            city,
            state
        });

        const token = jwt.sign({
            user_id: user._id,
            email
        }, process.env.JWT_KEY);
        user.token = token;
        res.status(201).json({
            user_res: user,
        })
    } catch (err) {
        console.log(err);
    }
}
const deleteBranch = async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await branchModel.deleteOne({ _id: id })
        res.status(200).json({ user: deletedUser })
    } catch (err) {
        console.log(err);
    }
}
//Dangerous Methods - USE IT ONLY WHEN IT IS ABSOLUTELY NECESSARY
//WITH GREAT POWER COMES GREAT RESPONSIBILITY

const deleteUsers = async (req, res) => {
    try {
        const response = await userModel.deleteMany({})
        res.status(200).json({
            deleted_users: response.deletedCount
        })
    } catch (err) {
        console.log(err);
    }
}
const deleteBranches = async (req, res) => {
    try {
        const response = await branchModel.deleteMany({})
        res.status(200).json({
            deleted_branches: response.deletedCount
        })
    } catch (err) {
        console.log(err);
    }
}
const deleteHospitals = async (req, res) => {
    try {
        const response = await hospitalModel.deleteMany({})
        res.status(200).json({
            deleted_hospitals: response.deletedCount
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    readUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteUsers,
    readBranches,
    addBranch,
    updateBranch,
    deleteBranch,
    deleteBranches,
    addHospital,
    deleteHospitals
}