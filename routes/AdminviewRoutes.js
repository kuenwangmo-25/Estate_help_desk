
const express = require("express");
const router = express.Router();
const viewController = require("../Controller/viewController")
const authController = require ("../Controller/authController")

router.get('/',viewController.getLoginForm)

router.get("/home", authController.protect,viewController.home)
router.get("/getemail",viewController.emailform)
router.get("/verifyotp",viewController.otpform)
router.get("/feedback", viewController.feecback)
router.get("/issuelist",viewController.issuelist)
// router.get("/profile",authController.protect,viewController.verifyemail)

module.exports = router;