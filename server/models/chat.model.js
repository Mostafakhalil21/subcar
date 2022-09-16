const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    sender:{
    type:String,
    required:true
    },
    receiver:{
    type:String,
    required:true
    },
    message:{
    type:String,
    required:true
    },
   
},
{ timestamps: true }
)

const Msg = module.exports = mongoose.model('Msg',msgSchema);