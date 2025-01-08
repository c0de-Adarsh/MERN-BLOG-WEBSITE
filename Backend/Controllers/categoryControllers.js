const Category = require('../Models/Category')

const createCategory = async (req , res) =>{
     
    try { 

      const data = req.body;

      const newData = new Category(data)
      const response = await newData.save()
      
      res.status(200).json({
        success:true,
        response
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        message:'Internal Server Error',
        success:false,
        error:error.message
      })
    }

  }


   const getAllCategory = async (req , res) =>{

       try {
        
        const category = await Category.find()

         res.status(200).json({
            message:'Data Fetched Successfully',
            success:true,
            category
         })
       } catch (error) {
        console.log(error.message)
      res.status(500).json({
        message:'Internal Server Error',
        success:false,
        error:error.message
      })
       }
   }
  module.exports = {createCategory,getAllCategory}