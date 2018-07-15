const express = require('express')
const router = express.Router()
var path = require('path');

const page = path.join(__dirname + '../../../public/index.html');


router.get('/',(req,res,next)=>{
    res.sendFile(page);
})

module.exports = router
