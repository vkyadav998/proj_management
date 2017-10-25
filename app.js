let express = require("express");
let app = new express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let autoIncrement = require('mongoose-autoincrement');
let _underscore = require("underscore");
let config = require("./server/config");

app.use(bodyParser.json({limit: config.LIMIT}));
app.use(bodyParser.urlencoded({limit: config.LIMIT, extended: true }));

mongoose.connect(config.DB_PATH);

let router = express.Router();

app.use(express.static('public/'));
let reqserver = require('./server/manager');

app.use('/', reqserver);

app.listen(config.PORT,function(){
    console.log(`!! server started on port ${config.PORT} !!`);
});
