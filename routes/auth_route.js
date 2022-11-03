const express = require('express')
const router = express.Router();
const { hospitalLogin, register, userLogin, branchLogin } = require('../controllers/auth_controller');

router.post("/register", register)
router.post("/login/hospital", hospitalLogin)
router.post("/login/user", userLogin)
router.post("/login/branch", branchLogin)

module.exports = router