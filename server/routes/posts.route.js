const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const passport = require('passport');
const Post = require('../models/posts.model')
const Hosting = require('../models/hosting.model')
const User = require('../models/user.model');


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
router.put("/like/:id" ,async (req , res ) => {
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
router.get("/timeline/:id" , async (req , res ) => {
  try{
    const currentUser = await User.findById(req.params.id);
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

// router.get('/newPost/:id', (req, res) => {
//   Post.find({userId:req.params.id}).sort({
//     _id:-1
//   }).limit(1).exec(function (err, docs) {
//       if (!err) {
//           res.send(docs);
//       } else {
//           console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
//       }
//   });
// });


module.exports = router;