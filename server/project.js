let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
               require('./schema');

let  PROJECT = mongoose.model('PROJECT_MODEL');

router.get('/getall_project', function(req, res)  {
    PROJECT.find({}, function (err, docs){
        if(err){
            console.log(err);
        }
        res.json({"success" : true, allItom : docs});
    });
});

router.post('/add_project', function(req, res){
    let project =req.body;
    let new_project = new PROJECT(project);
    new_project.save(function(err, data) {
        if (err) {return console.error(err)};
         res.json(new_project);
    });
});

router.post('/update_project', function(req, res)  {
    let check =req.body;
    PROJECT.findByIdAndUpdate(check._id, check,function(err, docs){
        if(err){
            console.log("Something wrong when updating data!");
        }
        res.json(docs);
    });
});

router.post('/remove_project', function(req, res)  {
    let check =req.body;
    PROJECT.remove({"_id":check._id}, function(err, docs){
        if(err){
            console.log(err);
        }
            res.json(docs);
    });
});

module.exports = router;
