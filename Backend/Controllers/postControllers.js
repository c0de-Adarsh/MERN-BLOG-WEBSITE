const Post = require('../Models/Post')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const Category = require('../Models/Category')



const createPost = async (req, res) => {

    try {
      console.log("Received data:", req.body);
       const newPostData = req.body

       const newPost = new Post(newPostData)

       const savePost = await newPost.save()

       res.status(200).json({
           success:true,
           savePost
       })
    } catch (error) {
      console.log(error)
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

       const post = Post.findById(postId)

       if(!post){
           return res.status(401).json({
               message:'Post Not Found',
               message:false
           })
       }

       //check if username matches 

       if(post.username === req.body.username){

           try {
           
                //update post with new data

                const updatePost = await Post.findByIdAndUpdate(postId,{
                   $set: req.body
                },
               
                {new:true}
               )

               //send the updated post as the response 

               res.status(200).json({
                   message:"Post updated Successfully",
                   success:true,
                   updatePost
               })
           } catch (error) {
              return res.status(500).json({
                   message:"Error Updateing post",
                   success:false,
                   error:error.message
               })
           }
       } else{
           return res.status(401).json({
               message:'Only you can update your own post',
               success:false
           })
       }
   } catch (error) {
       console.error(error.message)
       return res.status(500).json({
           message:'Internal Server Error',
           success:false
       })
   }

  }

  const deletePost = async (req , res) =>{
       
    try {
       
       const postId = req.params.id;

    const post = await Post.findById(postId)

    if(!post){
       return res.status(401).json({
           message:'Post Not Found',
           success:false
       })
    }

   //check if user matches
   if(post.username === req.body.username){

      try {
       
        //delete post

        const deletePost = await Post.findByIdAndDelete(postId)

        return res.status(200).json({
            message:'Post Deleted Successfully',
            success:true,
            deletePost
        })
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({
           message:'Error deleting post',
           success:false,

        })
      }
   } else{
       return res.status(500).json({
           message:'Only you can delete your own post',
           success:false
       })
   }

    } catch (error) {
       console.log(error.message)
       res.status(500).json({
           message:'Internal Server Error',
           success:false
       })
    }
  }

  
  // const getAllPost = async (req, res) => {
  
  //     try {
        
  //       const username = req.query.user
  //       const catName = req.query.category
         
  //       console.log("Username Query:", username); // Debugging
  //       console.log("Category Query:", catName); // Debugging
  //       let post;

  //       if(username){
  //         console.log("Fetching posts by username...");
  //         post = await Post.find({username})
  //         console.log("Posts by username:", post)
  //       } else if (catName){
  //         console.log("Fetching posts by category...");
  //         post = await Post.find({
  //           categories: {
  //             $in: [catName],
  //           }
  //         })
  //         console.log("Posts by category:", post);
  //       } else {
  //         // Fetch all posts if no query parameters are provided
  //     post = await Post.find();
  //     console.log("All posts:", post);
  //       }


  //       res.status(200).json({
  //         message: "Posts fetched successfully",
  //         success: true,
  //         post,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching posts:", error.message);

    
  //   return res.status(500).json({
  //     message: "Error fetching posts",
  //     success: false,
  //     error: error.message,
  //   });
  //     }
     
  // }
   
  const getAllPost = async (req, res) => {
    try {
      const username = req.query.user; // Extract 'user' query parameter
      const catName = req.query.category; // Extract 'category' query parameter
  
      console.log("Username Query:", username); // Debugging log
      console.log("Category Query:", catName); // Debugging log
  
      let post;
  
      if (username) {
        // Query posts by username
        post = await Post.find({ username });
        console.log("Posts by username:", post);
      } else if (catName) {
        // Query posts by category
        post = await Post.find({
          categories: {
            $in: [catName],
          },
        });
        console.log("Posts by category:", post);
      } else {
        // Query all posts if no filters provided
        post = await Post.find();
        console.log("All posts:", post);
      }
  
      // Respond with fetched posts
      res.status(200).json({
        message: "Posts fetched successfully",
        success: true,
        post,
      });
    } catch (error) {
      console.error("Error fetching posts:", error.message);
  
      // Respond with error
      res.status(500).json({
        message: "Error fetching posts",
        success: false,
        error: error.message,
      });
    }
  };
  
  const getPostById = async (req , res) =>{
      
    try {
      
      const postId = req.params.id

      //fetched post id 

      const post = await Post.findById(postId)

      if(!post){

        return res.status(401).json({
          message:'Post Not Found',
          success:true
        })
      }

      return res.status(200).json({
        message:'Post fetched successfully',
        success:true,
        post
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        message:"Internal Server Error",
        success:true
      })
    }
  }


 
module.exports = {createPost,uploadPostImages,updatePost,deletePost,getAllPost,getPostById}
