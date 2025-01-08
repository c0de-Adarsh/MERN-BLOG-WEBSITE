const bcrypt = require('bcrypt')
const User = require('../Models/User')
const Post = require('../Models/Post')
const {generateToken} = require('../jwt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const fs = require('fs')
const path = require('path')


const signupUser = async(req, res) =>{
 
    try {
        
        const { username, email, password } = req.body;

     

        //hashed the password before saving

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User({
            username,
            email,
            password:hashedPassword
        })
         
        if(!username || !email || !password){
            return res.status(401).json({
                message:'All fields required',
                success:false
            })
        }
        
        const existUser = await User.findOne({email:email})

        if(existUser){
            return res.status(401).json({
                message:'User already Exist'
            })
        }
        const token = generateToken(user)
        await user.save()

        return res.status(200).json({
            message:'User Register Successfully',
            success:true,
            user,
            token
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:'Internal Server error',
            success:false
        })
    }
}




const loginUser = async (req , res) =>{

    try {
        
        const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Invalid credentails",
            success:false
        })
    }

    //find the user by email
    
     const user = await User.findOne({email})

     if(!user){

        return res.status(401).json({
            message:"User Not found",
            success:false

        })
     }

     const isMatched = await bcrypt.compare(password,user.password);

     if(!isMatched){
        return res.status(401).json({
            message:"Incorrec Password",
            success:true
        })
     }
      
     const token = generateToken(user._id, user.email)

     res.status(200).json({
        message:'User Logged in Successfully',
        success:true,
        token
     })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:'Internal Server error',
            success:false
        })
    }
}

const editUser = async (req, res)=>{
   
    try {
        
        const userId = req.params.id
        const updateData = req.body


        //if the user trying to update another account 

        if(updateData.userId !== userId){
            
            return res.status(401).json({
                message:'You can update only your account',
                success:false
            })
        }

        //if password updated hash it
        if(updateData.password){
            const salt = await bcrypt.genSalt(10)
            updateData.password = await bcrypt.hash(updateData.password,salt)
        }
        

        const updateUser = await User.findByIdAndUpdate(userId,updateData,{
            runValidators:true,
            new:true
        })

        if(!updateUser){
            return res.status(401).json({
                message:"User Not Found",
                success:false
            })
        }

        console.log('Data Update Successfull')

        res.status(200).json({
            message:'User update Successfully',
            success:true,
            updateUser
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:'Internal Server error',
            success:false
        })
    }

}

const deleteUser = async(req ,res) =>{

    try {
        
        const userId = req.params.id

        //find the user 

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:'User Not Found',
                success:false
            })
        }

        //delete all post with user 

        await Post.deleteMany({username: user.username})

        await User.findByIdAndDelete(userId)

        res.status(200).json({
            message:'User Delete Successfull',
            success:true
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:'Internal Server error',
            success:false
        })
    }
}


  const getUser = async (req , res) =>{

    try {
        
        const userId = req.params.id

        //find the use by id

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:'User Not Found',
                success:false
            })
        }

        //exclude the password

        const {password , ...userDetails} = user._doc;

        res.status(200).json({
            message:'User retrive successfully',
            success:true,
            data:userDetails
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        })
  }
  }

  const getUserStatus = async (req , res) =>{
    
     
    try {
        
        const username = req.params.username

        //find the user based on the username excluding password

        const user = await User.findOne({username},{password:0})

        if(!user){
            return res.status(404).json({
                message:'User Not Found',
                success:false
            })
            
        }
         

        res.status(200).json({
            message:'User retrived Successfully',
            success:true,
            user
        })
       
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            error:"Internal Server error",
            success:false
        })
    }
  }

  const logOrNot = async(req , res)=>{

    

    try {

        const authorization = req.headers.authorization

        if(!authorization){
            return res.status(401).json({
                message:"Token Not Found"
            })
        }

        const token = authorization.split(' ')[1]

        if(!token){
            return res.status(401).json({
                message:'Unauthorized',
                loggedIn:false
            })
        } else {
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            return res.json({
                loggedIn:true,
                message:true
            })
        }
        
    } catch (error) {
        return res.json({
            error:error.message,
            loggedIn:false
        })
    }
}






  const createPost = async (req, res) => {

     try {
        
        const newPostData = req.body

        const newPost = new Post(newPostData)

        const savePost = await newPost.save()

        res.status(200).json({
            success:true,
            savePost
        })
     } catch (error) {
        res.status(500).json({
            message: "Error while creating post",
            success: false,
            error: error.message,
        });
     }
  }

  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  
 
  const uploadPostImages = async (req, res) => {
    try {
      // Check if file is provided
      if (!req.files || !req.files.photo) {
        return res.status(400).json({
          message: 'No file uploaded',
          success: false
        });
      }
  
      const file = req.files.photo;
  
      // Ensure the 'uploads' directory exists
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
  
      // Move the file to the 'uploads' directory before uploading to Cloudinary
      const uploadPath = path.join(uploadDir, file.name);  // Use the correct path for your platform
      file.mv(uploadPath, async (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Failed to move file',
            success: false,
            error: err.message
          });
        }
  
        // Upload the image to Cloudinary after moving it to a valid location
        try {
          const result = await cloudinary.uploader.upload(uploadPath);
          
          // Send back the secure URL of the uploaded image
          res.json({
            imageUrl: result.secure_url,
            success: true
          });
        } catch (error) {
          res.status(500).json({
            message: 'Failed to upload image to Cloudinary',
            success: false,
            error: error.message
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Error uploading image",
        success: false,
        error: error.message,
      });
    }
  };
  

   const updatePost = async (req , res) =>{
      
    try {
        
        const postId = req.params.id;

        const post = User.findById(postId)

        if(!post){
            return res.status(401).json({
                message:'Post Not Found',
                message:false
            })
        }

        
    } catch (error) {
        
    }

   }
module.exports = {signupUser,loginUser,editUser,deleteUser,getUser,getUserStatus,logOrNot,createPost,uploadPostImages}