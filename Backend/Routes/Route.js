const express = require('express')
const router = express.Router()


const {signupUser,loginUser,editUser} = require('../Controllers/userController')





router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/edit/:id').put(editUser)


module.exports = router