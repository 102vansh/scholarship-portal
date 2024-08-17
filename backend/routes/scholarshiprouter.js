const express = require("express");
const { getscholarship, setScholarshipCriteria, allocateFunds } = require("../controller/scholarship");
const { isAuthenticates } = require("../middleware/isAuthorize");
const { authorizerole } = require("../middleware/authorizerole");

const router = express.Router();

router.route('/getscholarship').get(getscholarship)
// src/routes/scholarshipRoutes.js
router.route('/criteria').post(isAuthenticates, authorizerole('principal'), setScholarshipCriteria);
router.route('/allocate').post(isAuthenticates, authorizerole('finance'),allocateFunds);




module.exports = router