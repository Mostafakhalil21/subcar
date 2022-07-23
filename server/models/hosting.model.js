const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const imageSchema = new Schema({
  url: {type:String},
  text: {type:String}
});

const imagesSchema = new Schema({
  images : [imageSchema]
});

// const postSchema = new Schema({
//   imagePost: [imagesSchema]
// });

const HostingSchema = mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    businessName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    businessImg: {
      type: String
    },
    adminPosts :[imagesSchema]
  });

  const Hosting = module.exports = mongoose.model('Host', HostingSchema);

  module.exports.getHostById = function(id, callback){
    Hosting.findById(id, callback);
  }

  module.exports.getHostByBusinessName = function(businessName, callback){
    const query = {businessName: businessName}
    Hosting.findOne(query, callback);
  }

  module.exports.addHost = function(newHost, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newHost.password, salt, (err, hash) => {
        if(err) throw err;
        newHost.password = hash;
        newHost.save(callback);
      });
    });
  }


  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }