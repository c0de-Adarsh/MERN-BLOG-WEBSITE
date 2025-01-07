const bcrypt = require('bcrypt')
const User = require('../Models/User')
const {generateToken} = require('../jwt')

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

module.exports = {signupUser,loginUser,editUser}