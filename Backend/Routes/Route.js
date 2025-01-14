const express = require('express')
const router = express.Router()



const {signupUser,loginUser,editUser,deleteUser,getUser,getUserStatus,logOrNot} = require('../Controllers/userController')
const {createPost,updatePost,uploadPostImages,deletePost,getAllPost,getPostById} = require('../Controllers/postControllers')

const {createCategory,getAllCategory} = require('../Controllers/categoryControllers')


const {jwtAuthMiddleware} = require('../jwt');
const fileUpload = require('express-fileupload');


router.use(fileUpload({
    useTempFiles:true
}))

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/edit/:id').put(editUser)
router.route('/delete/:id').delete(deleteUser)
router.route('/getuser/:id').get(getUser)
router.route('/status').get(jwtAuthMiddleware,getUserStatus)
router.route('/logornot').get(logOrNot)
router.route('/createpost').post(createPost)
router.route('/updatepost/:id').put(updatePost)
router.route('/deletepost/:id').delete(deletePost)
router.route('/getallpost').get(getAllPost)
router.route('/getpost/:id').get(getPostById)
router.route('/createcatogory').post(createCategory)
router.route('/getcatogory').get(getAllCategory)


//cloudinary image upload route

router.route('/upload').post(uploadPostImages)

module.exports = router