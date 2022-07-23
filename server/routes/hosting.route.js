const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Hosting = require('../models/hosting.model')
const passport = require('passport');






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
              email: host.email
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

  module.exports = router;