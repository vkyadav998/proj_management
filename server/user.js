let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
               require('./schema');

let  USER = mongoose.model('USER_MODEL');

router.get('/getall_user', function(req, res)  {
    USER.find({}, function (err, docs){
        if(err){
            console.log(err);
        }else{
            if(docs.length > 0){
                res.json({"success" : true, allItom : docs});
            }else{
                let user = {
                    "NAME": "vipin yadav","MOBILE": "9769939005","ROLE": "ADMIN","EMAIL": "admin@admin.com","PASSWORD": "admin"
                };
                let new_user = new USER(user);
                new_user.save(function(err, data) {
                    if (err) {return console.error(err)};
                    res.json(data);
                });
            }
        }
    });
});

router.post('/add_user', function(req, res){
    let user =req.body;
    let new_user = new USER(user);
    new_user.save(function(err, data) {
        if (err) {return console.error(err)};
        res.json(data);
    });
});

router.post('/update_user', function(req, res)  {
    let check =req.body;
    USER.findByIdAndUpdate(check._id, check,function(err, docs){
        if(err){
            console.log("Something wrong when updating data!");
        }
        res.json(docs);
    });
});

router.post('/remove_user', function(req, res)  {
    let check =req.body;
    USER.remove({"_id":check._id}, function(err, docs){
        if(err){
            console.log(err);
        }
        res.json(docs);
    });
});

module.exports = router;