const express = require('express')
const router = express.Router();
const { upload } = require('../middlewares/image_adding_middleware')
const { readUsers, addUser, updateUser, deleteUser, deleteUsers, readBranches, addBranch, updateBranch, deleteBranch, deleteBranches, addHospital, deleteHospitals } = require('../controllers/admin_controller')


//User Related Routes
router.get('/read/users/', readUsers)
router.post('/add/users/', addUser)
router.post('/manage/users/:id', updateUser)
router.delete('/delete/users/:id', deleteUser)

//Branch Related Routes
router.get('/read/branches/', readBranches)
router.post('/add/branches/', addBranch)
router.post('/manage/branches/:id', updateBranch)
router.delete('/delete/branches/:id', deleteBranch)

//Hospital Related Routes
router.post('/add/hospitals/', addHospital)


//Dangerous Routes - USE IT ONLY WHEN IT IS ABSOLUTELY NECESSARY
router.post('/delete/branches', deleteBranches)
router.post('/delete/users', deleteUsers)
router.post('/delete/hospitals', deleteHospitals)

module.exports = router