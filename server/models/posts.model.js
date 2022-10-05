const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const postSchema = new mongoose.Schema(
  {
    hostName:{
      type: String,
    },
    businessImg:{
      type: String,
    },
    userId: {
      type: String,
      
    },
    desc:{
      type:String,
      max:500
    },
    img:{
      type:String
    },
    cartype:{
      type:String,
    },
    kms:{
      type:String,
    },
    ownersnumber:{
      type:String,

    },
    carcolor:{
      type:String,
    },
    caryear:{
      type:String,
    },
    likes:{
      type:Array,
      default:[]
    },
    viewed:{
      type:Number,
      default:0
    },
    price:{
      type:String,
    },
    code:{
      type:Number,
      
    }
  },
  { timestamps: true }
);


  const Post = module.exports = mongoose.model("posts" , postSchema);
