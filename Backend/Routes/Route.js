const express = require('express')
const router = express.Router()


const {signupUser,loginUser,editUser,deleteUser,getUser,getUserStatus,logOrNot} = require('../Controllers/userController')
const {jwtAuthMiddleware} = require('../jwt');



router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/edit/:id').put(editUser)
router.route('/delete/:id').delete(deleteUser)
router.route('/getuser/:id').get(getUser)
router.route('/status/:username').get(jwtAuthMiddleware,getUserStatus)
router.route('/logornot').get(logOrNot)

module.exports = router