const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const passport = require('passport');
const Post = require('../models/posts.model')
const Hosting = require('../models/hosting.model')
const User = require('../models/user.model');
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function(req , file , cb) {
    cb(null , './uploads');
  },
  filename:function(req , file , cb) {
    cb(null , file.originalname)
  }
})


const fileFilter = (req , file , cb) => {
  // reject a file 
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
  cb (null , true );
  }else{
    cb ( null ,false );
  }
};
const upload = multer({
  storage:storage, 
  limits: {
  fileSize: 1024 * 1024 * 5
},
fileFilter:fileFilter
});




// create a post
router.post("/createpost" , upload.single('hostImage') , async(req,res) =>{
  const newPost = new Post({
    hostName:req.body.hostName,
    businessImg:req.body.businessImg,
    userId:req.body.userId,
     img:req.file.path,
    cartype:req.body.cartype,
    kms:req.body.kms,
    ownersnumber:req.body.ownersnumber,
    carcolor:req.body.carcolor,
    caryear:req.body.caryear,
    desc:req.body.desc,
    price:req.body.price,
    code:req.body.code
   

  })
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

router.put('/postimage/:id', upload.single('hostImage'), (req, res) => {
 

  var post = {
              img:req.file.path,
         
  };
  Post.findByIdAndUpdate(req.params.id, {$set: post}, {new: true}, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in post Update :' + JSON.stringify(err, undefined, 2));
    }
  });
});


//delete a post
router.delete("/delete/:id/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.params.userId) {
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
        return Post.find({userId:friendId})
      })
    );
    
    res.json(friendPosts)
  }catch(err){
    res.status(500).json(err);

  }
})

router.get('/newPost/:id', (req, res) => {
  Post.find({userId:req.params.id}).sort({
    _id:-1
  }).limit(1).exec(function (err, docs) {
      if (!err) {
          res.send(docs);
      } else {
          console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
      }
  });
});


// coount posts for a spacific host

router.get("/countposts/:id" , async (req, res) =>{
  try{

    const hostPosts = await Post.find({userId:req.params.id});
      res.status(200).json(hostPosts.length)
  }catch(err){
    
    res.status(500).json(err);
  }

})

router.get("/get/posts" , (req,res) =>{
  Post.find((err , docs) => {
    if(!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  })
})


router.get("/get/code" , async (req ,res ) => {
  try{
    const codes = await Post.find().distinct("code")
    res.status(200).json(codes)
  }catch(err){
    res.status(500).json(err)
  }
})


router.get('/most/liked', (req, res) => {
  Post.find().sort({
      likes: -1
  }).limit(2).exec(function (err, docs) {
      if (!err) {
          res.send(docs);
      } else {
          console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
      }
  });
});

router.get('/most/viewed', (req, res) => {
  Post.find().sort({
      viewed: -1
      
  }).limit(5).exec(function (err, docs) {
      if (!err) {
          res.send(docs);
      } else {
          console.log('Error in Retriving views :' + JSON.stringify(err, undefined, 2));
      }
  });
});

router.put('/increase/view/:id' , async (req, res) => {
try{
 const post= await Post.findByIdAndUpdate({_id:req.params.id}, {$inc: { viewed: 1}});
  res.status(200).json(post)

}catch(err){
  res.status(500).json(err)
} 
})

module.exports = router;