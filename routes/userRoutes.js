const express = require ('express')
const userController = require ('../Controller/userController')
const authController = require ('../Controller/authController')
const router = express.Router()

router.post('/login', authController.login)

router.post("/bulkUpload", userController.uploadExcel, userController.bulkUploadUsers);
router.post("/register", authController.register)
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser)


router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete (userController.deleteUser)

module.exports = router