const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const passport = require('passport');
const Post = require('../models/posts.model')
const Hosting = require('../models/hosting.model')
const User = require('../models/user.model');




// router.post('/posts/:businessName'  , async(req,res) =>{
//     const businessName = "yoo";
    
//             const posts =await  post.create({
//                 hostBusinessName:req.body.businessName,
//                 hostPosts:[
//                     {
//                         images:[{  url:req.body.url,text:req.body.text }]}]
//             });
//             posts.save().then(data => {
//                 res.json(data);
//             })
//             .catch(err => {
//                 res.json({
//                     message: err
//                 })
//             })
        
//     }   
// );


// router.get('/posts', async (req , res) =>{
//     try{
//         const posts = await post.find();
//         res.json(posts);
//         console.log(posts);
//     }catch(err){
//         res.json({
//             message: err
//         });
//     }


// })



// router.post("/newpost", async (req, res) => {
//     const { url, name, text } = req.body;
  
//     const userId = "62dbebddba5c091fd490cae4"; //TODO: the logged in user id
  
//     try {
//       let posts = await post.findOne({ userId });
  
//       if (posts) {
//         //posts exists for use
         
//           posts.images.push({ url, name, text  });
//         posts = await posts.save();
//         return res.status(201).send(posts);
//       }else {
//         //no posts for user, create new cart
//         const newpost = await post.create({
//           userId,
//           images: [{ url, name, text }]
//         });
  
//         return res.status(201).send(newpost);
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Something went wrong");
//     }
//   });



//   router.get('/posts/searchOfuserid', (req, res) => {
//     const userId = req.query.userId;
//     post.find({
//       userId: userId
//     }, function (err, response) {
//         if (err)
//             res.send(err);
//         else
//             res.send(response)
//     })
// });




// ---------------------------- something new ------------------------

// create a post
router.post("/createpost" , async(req,res) =>{
  const newPost = new Post(req.body)
  try{
    const savePost = await newPost.save();
    res.status(200).json(savePost)
  }catch(err){
    res.status(500).json(err)
  }
}) 



//get all post for a specific Host
router.get("/posts/:id" , async (req, res) =>{
  try{

    const hostPosts = await Post.find({userId:req.params.id});
      res.status(200).json(hostPosts)
  }catch(err){
    
    res.status(500).json(err);
  }

})




//update a post
router.put("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete a post
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post
router.put("/:id/like" ,async (req , res ) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){;
      await post.updateOne({$push:{likes:req.body.userId}});
      res.status(200).json("the post has been liked")
    }else{
      await post.updateOne({$pull:{likes:req.body.userId}});
      res.status(200).json("the post has been disliked")

    }
  }catch(err){
    res.status(500).json(err);

  }
})


//get a post

router.get("/:id" , async (req,res) =>{
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  }catch(err){
    res.status(500).json(err);

  }
})



//get all posts of user followiing  // get timeline posts
router.get("/timeline/all" , async (req , res ) => {
  try{
    const currentUser = await User.findById(req.body.userId);
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) =>{
        return Post.find({userId:friendId});
      })
    );
    res.json(friendPosts)
  }catch(err){
    res.status(500).json(err);

  }
})

module.exports = router;