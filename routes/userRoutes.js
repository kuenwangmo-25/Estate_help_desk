const express = require ('express')
const userController = require ('../Controller/userController')
const authController = require ('../Controller/authController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post("/bulkUpload", userController.uploadExcel, userController.bulkUploadUsers);

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