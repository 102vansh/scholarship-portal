const express = require("express");
const { register, login, logout, getmyprofile } = require("../controller/studentController");
const { isAuthenticates } = require("../middleware/isAuthorize");

const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(isAuthenticates,logout)
router.route('/getmyprofile').get(isAuthenticates,getmyprofile)

module.exports = router