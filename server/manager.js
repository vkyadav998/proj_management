let express = require('express');
let router = express.Router();

let login = require('./login');
let project = require('./project');
let user = require('./user');

router.use("/login", login);
router.use("/project", project);
router.use("/user", user);

module.exports = router;