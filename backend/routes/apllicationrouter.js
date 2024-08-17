const express = require("express");
const router = express.Router();
const { getapplicationstatus, listDepartmentApplications, reviewApplication, createscholarship, getallapplications, allapproveapplications, createapplication, upladdocument, hodfeedback, approveform, rejectform, approveApplication, rejectApplication, principalreviewApplications, generateReports, sendNotification, trackDisbursement, generateFinancialReport, statusofscholarship } = require("../controller/applicationcontroller");
const { isAuthenticates } = require("../middleware/isAuthorize");
const { authorizerole } = require("../middleware/authorizerole");



router.route('/createapplication').post(isAuthenticates,createapplication)
router.route('/getapplicationstatus/:id').get(isAuthenticates,authorizerole('hod','student'),getapplicationstatus)
router.route('/listdepartmentapplication').get(isAuthenticates,authorizerole('hod'),listDepartmentApplications)
router.route('/reviewappliaction/:id').put(isAuthenticates,authorizerole('hod'),reviewApplication)
router.route('/createscholarship').post(isAuthenticates,authorizerole('finance'),createscholarship)
router.route('/getapplication').get(isAuthenticates,authorizerole('principal'),getallapplications)
router.route('/approvalapplication').get(isAuthenticates,authorizerole('finance'),allapproveapplications)
router.route('/uploaddocument').post(isAuthenticates,upladdocument)
router.route('/feedbackhod/:id').post(isAuthenticates,authorizerole('hod'),hodfeedback)
router.route('/approve/:id').post(isAuthenticates,authorizerole('hod'),approveform)
router.route('/reject/:id').post(isAuthenticates,authorizerole('hod'),rejectform)
router.route('/getreview').get(isAuthenticates,authorizerole('principal'),principalreviewApplications)
router.route('/principalapprove/:id').post(isAuthenticates, authorizerole('principal'), approveApplication);
router.route('/reject/:id').post(isAuthenticates, authorizerole('principal'), rejectApplication);
// src/routes/reportRoutes.js
router.route('/reports').get(isAuthenticates, authorizerole('principal'), generateReports);
// src/routes/notificationRoutes.js
// router.route('/notifications').post(isAuthenticates, authorizerole('principal'), sendNotification);
router.route('/funddis').get(isAuthenticates, authorizerole('finance'), trackDisbursement);
router.route('/financereport').get(isAuthenticates, authorizerole('finance'),generateFinancialReport);
router.route('/status/:id').get(isAuthenticates,authorizerole('student'),statusofscholarship)

 module.exports = router