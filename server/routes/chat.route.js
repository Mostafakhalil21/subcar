const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const passport = require('passport');
const Post = require('../models/posts.model')
const Hosting = require('../models/hosting.model')
const User = require('../models/user.model');
const multer = require("multer");
const Msg = require('../models/chat.model')



//sender post

router.post("/msg" ,async (req , res) => {

const newmsg = new Msg({
    sender:req.body.sender,
    receiver:req.body.receiver,
    message:req.body.message,
})
try{
    const saveMsg = await newmsg.save();
    res.status(200).json(saveMsg)
}catch(err){
    res.status(500).json(err)
}
})

// get  sender  messages
router.get("/getsendermsg/:senderid/:receiverid" , async (req , res) => {
   const sender = req.params.senderid;
   const receiver = req.params.receiverid;
    try{
        const senderMsg = await Msg.find({$or :[{sender,receiver},{sender:req.params.receiverid,receiver:req.params.senderid}]}).sort({ "timestamp" : -1 });
        res.status(200).json(senderMsg)
    }catch(err){
        res.status(500).json(err)
    }
})

// get receiver messages

router.get("/getreceiver/:id"  , async( req , res) => {
    const receiver = req.params.id;
    const sender = req.body.sender;
    try{
        const receiverMsg = await Msg.find({receiver,sender});
        res.status(200).json(receiverMsg)
    }catch(err){
        res.status(500).json(err)
    }
})


//get all messages

router.get("/allmsg/:id" , async(req , res ) => {
    try {
        const allmsg = await Msg.find({$or :[{sender:req.params.id},{receiver:req.params.id}]})
        res.status(200).json(allmsg)

    }catch(err){
        res.status(500).json(err)

    }
})

module.exports = router;