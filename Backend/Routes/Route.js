const express = require('express')
const router = express.Router()
const upload = require('express-fileupload')


const {signupUser,loginUser,editUser,deleteUser,getUser,getUserStatus,logOrNot,createPost,uploadPostImages} = require('../Controllers/userController')
const {jwtAuthMiddleware} = require('../jwt');
const fileUpload = require('express-fileupload');

router.use(fileUpload())

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/edit/:id').put(editUser)
router.route('/delete/:id').delete(deleteUser)
router.route('/getuser/:id').get(getUser)
router.route('/status/:username').get(jwtAuthMiddleware,getUserStatus)
router.route('/logornot').get(logOrNot)
router.route('/createpost').post(createPost)


//cloudinary image upload route

router.route('/upload').post(uploadPostImages)

module.exports = router