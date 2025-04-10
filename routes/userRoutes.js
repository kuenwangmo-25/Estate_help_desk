const express = require ('express')
const userController = require ('../Controller/userController')
const authController = require ('../Controller/authController')
const equipmentController = require ("../Controller/equipmentController")
const issueController = require("../Controller/issueController")
const router = express.Router()

router.post('/login', authController.login)
router.post("/register", authController.register)
router.get("/logout",authController.logout)

// Admin
router.post("/admin-login", authController.adminlogin);
router.post("/bulkUpload", userController.uploadExcel, userController.bulkUploadUsers);
router.post("/equipment", equipmentController.createEquipment)
router.get('/getallequipments', equipmentController.getAllEquipment)
router.post("/category",equipmentController.createCategory)
router.get("/getallcategories", equipmentController.getAllCategories)
router.get("/getusercount",userController.getUserCount)
router.post("/Status",equipmentController.createStatus)
router.get("/getallstatus",equipmentController.getAllStatus)
router.get("/me", authController.protect,userController.getUser)
router.patch("/updatePassword", authController.protect, authController.updatePassword)

// ISUUE
router.post("/issue",issueController.createIssue)
router.post("/feedback", issueController.createFeedback)
router.get("/getallfeedback",authController.protect, issueController.getAllFeedback)

// Feedback
router
.route('/feedback/:id')
.delete (issueController.deleteFeedback)


router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser)


router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete (userController.deleteUser)

module.exports = router