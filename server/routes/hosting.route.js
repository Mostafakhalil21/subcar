const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Hosting = require('../models/hosting.model')
const passport = require('passport');
const bcrypt = require('bcryptjs');







router.post('/register', (req, res, next) => {
    let newHoste = new Hosting({
      name: req.body.name,
      email: req.body.email,
    businessName :req.body.businessName,
      password: req.body.password
    });
  
    Hosting.addHost(newHoste, (err, host) => {
      if (err) 
      {
        res.json({ success: false, msg: 'Failed to register host' });
      }
     else 
        {
        res.json({ success: true, msg: 'host registered' });
      }
    });
  });
 // Authenticate
  router.post('/authenticate', (req, res, next) => {
    const businessName = req.body.businessName;
    const password = req.body.password;
  
    Hosting.getHostByBusinessName(businessName, (err, host) => {
      if (err) 
      {
        throw err;
      }
      if (!host) 
      {
        return res.json({ success: false, msg: 'host not found' });
      }
  
      Hosting.comparePassword(password, host.password, (err, isMatch) => {
        if (err)
        {
            throw err;
        } 
        if (isMatch) 
        {
          const token = jwt.sign({ data: host }, config.secret, {
            expiresIn: 604800 // 1 week
          });
  
          res.json({
            success: true,
            token: `Bearer ${token}`,
            host: {
              id: host._id,
              name: host.name,
              businessName: host.businessName,
              email: host.email,
              hostPosts:host.hostPosts
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
    router.get('/hostprofile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
      res.json({
            user:req.user
      });
    });





    // -------------------------------- CRUD ------------------------------





    //update user

    router.put("/:id" ,async (req , res ) => {
      if(req.body.userId === req.params.id){
          if(req.body.password){
            try{
              const salt = await bcrypt.genSalt(10);
              req.body.password = await bcrypt.hash(req.body.password , salt);
            }catch(err){
                return res.status(403).json(err)
            }
          }
          try{
            const host = await Hosting.findByIdAndUpdate(req.params.id,{
              $set:req.body,
            });
              res.status(200).json("Account has been updated")
          }catch(err){
            return res.status(403).json(err)

          }
      }else {
          return res.status(403).json("you can update only your account")
      }


    });
    //delete user
    router.delete("/:id" ,async (req , res ) => {
      if(req.body.userId === req.params.id){
   
          try{
            const host = await Hosting.findByIdAndRemove(req.params.id);
              res.status(200).json("Account has been deleted")
          }catch(err){
            return res.status(403).json(err)

          }
      }else {
          return res.status(403).json("you can delete only your account")
      }


    });

    //get a user
router.get("/:id" , async (req,res) =>{
  try{
    const host = await Hosting.findById(req.params.id);
    const {password , updatedAt, ...other} = host._doc // not sending other and updateAt
    res.status(200).json(other)

  }catch(err){
    res.status(500).json(err);
  }
})

    //unfollow a user
 

  module.exports = router;