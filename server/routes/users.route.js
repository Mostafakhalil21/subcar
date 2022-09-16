const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/user.model');
var session = require('express-session');
const Hosting = require('../models/hosting.model')
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
})

// user Register
router.post('/register', upload.single('hostImage'), (req, res, next) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      userImage:req.file.path
    });
  
    User.addUser(newUser, (err, user) => {
      if (err) 
      {
        res.json({ success: false, msg: 'Failed to register user' });
      }
     else 
        {
        res.json({ success: true, msg: 'User registered' });
      }
    });
  });
  
  // Authenticate
  router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    User.getUserByUsername(username, (err, user) => {
      if (err) 
      {
        throw err;
      }
      if (!user) 
      {
        return res.json({ success: false, msg: 'User not found' });
      }
  
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err)
        {
            throw err;
        } 
        if (isMatch) 
        {
          const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 604800 // 1 week
          });
  
          res.json({
            success: true,
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
              following:user.following,
              userImage:user.userImage,
              lat:user.lat,
              lon:user.lon
              
              
            }
          });
        } 
        else 
        {
          return res.json({ success: false, msg: 'Wrong password' });
        }
      });
    });
  });
  
  // Profile
  router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
      }
    });
  });


  //follow a host
  router.put("/follow/:id" , async (req,res) =>{
    if(req.body.userId !== req.params.id){
      try{
        
        const host = await Hosting.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!host.follower.includes(req.body.userId)){

            await host.updateOne({$push:{follower:req.body.userId}});
          await currentUser.updateOne({$push:{following:req.params.id}});
            
            res.status(200).json("Host has been followed")

        }else{
          res.status(403).json("you alleady follow this Host")
        }

      }catch(err){
        res.status(500).json(err)
      }

    }else{
      res.status(403).json("you cant follow yourself")
    }
  })

  //unfollow a host

  router.put("/unfollow/:id" , async (req,res) =>{
    if(req.body.userId !== req.params.id){
      try{
        
        const host = await Hosting.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(host.follower.includes(req.body.userId)){

            await host.updateOne({$pull:{follower:req.body.userId}});
          await currentUser.updateOne({$pull:{following:req.params.id}});
            
            res.status(200).json("Host has been unfollowed")

        }else{
          res.status(403).json("you d'ont follow this Host")
        }

      }catch(err){
        res.status(500).json(err)
      }

    }else{
      res.status(403).json("you cant unfollow yourself")
    }
  })

//get all users

router.get("/allusers" , async (req , res) => { 
  try {
    const allusers = await User.find();
    res.status(200).json(allusers);


  }catch(err){
    res.status(500).json(err)

  }
})
  
  
  module.exports = router;