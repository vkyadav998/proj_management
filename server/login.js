let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
               require('./schema');

let  USER = mongoose.model('USER_MODEL');

router.post('/check_login', function(req, res)  {
    let check = {"EMAIL":req.body.EMAIL, "PASSWORD":req.body.PASSWORD};

    USER.findOne(check, function(err, docs){
        if(err){
            res.json({"success":false, "message":"please try after some time"});
        }else{
            if(docs){
                res.json({"data":docs._doc, "success":true, "message":"Login successfull"});
            }else{
                res.json({"success":false, "message":"Fail to login please ckeck Email ID & Password"});   
            }
        }
    });
});

module.exports = router;