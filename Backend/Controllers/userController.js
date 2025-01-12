const bcrypt = require('bcrypt')
const User = require('../Models/User')
const {generateToken} = require('../jwt')
const jwt = require('jsonwebtoken')



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

  const getUserStatus = async (req, res) => {
    try {
      const user = req.user; // Middleware se set hua user ka data
  
      if (!user) {
        return res.status(404).json({
          message: 'User Not Found',
          success: false,
        });
      }
  
      res.status(200).json({
        message: 'User retrieved Successfully',
        success: true,
        user: {
          name: user.name, 
          email: user.email,
          _id: user._id,
        },
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        error: 'Internal Server Error',
        success: false,
      });
    }
  };
  

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
                message:true,
                
            })
        }
        
    } catch (error) {
        return res.json({
            error:error.message,
            loggedIn:false
        })
    }
}


 
module.exports = {signupUser,loginUser,editUser,deleteUser,getUser,getUserStatus,logOrNot}