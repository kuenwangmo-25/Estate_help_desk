
const express = require("express");
const router = express.Router();
const viewController = require("../Controller/viewController")

router.get('/',viewController.getLoginForm)

router.get("/home", viewController.home)

// router.get("/getemail",viewController.getemailform)
// router.get("/otp",viewController.getotpform)

module.exports = router;