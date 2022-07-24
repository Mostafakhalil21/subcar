const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// const imageSchema = mongoose.Schema({
//     url: {type:String},
//     text: {type:String}
//   });
  
//   const imagesSchema = mongoose.Schema({
//     images : [imageSchema]
//   });

//   const postSchema = mongoose.Schema({
//         hostBusinessName:
//         {
//               type:String,
//         },
//         hostPosts:[imagesSchema]

//   });


// const postSchema = new mongoose.Schema(
//       {
//         userId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Hosting'
//         },
//         images: [
//           {
//             url: String,
//             name: String,
//             text: String
//           }
//         ],
//         active: {
//           type: Boolean,
//           default: true
//         },
//         modifiedOn: {
//           type: Date,
//           default: Date.now
//         }
//       },
//       { timestamps: true }
//     );


const postSchema = new mongoose.Schema(
  {
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
    likes:{
      type:Array,
      default:[]
    }
  },
  { timestamps: true }
);




  const Post = module.exports = mongoose.model("posts" , postSchema);
