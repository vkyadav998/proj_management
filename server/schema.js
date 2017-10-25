/**
 * Created by vk on 5/21/2017.
 */

let mongoose = require('mongoose');
let autoIncrement = require('mongoose-autoincrement');
let Schema = mongoose.Schema;

let projectSchema = new Schema({
    NAME: String,
    DESCRIPTION:String,
    TEAM_NAME:String,
    TEAM_STRENGTH:String,
}, {collection:'projects', timestamps:true });

projectSchema.plugin(autoIncrement, { model: 'PROJECT_MODEL', field: 'id' });
mongoose.model('PROJECT_MODEL', projectSchema);

let userSchema = new Schema({
    NAME: String,
    MOBILE: String,
    ROLE: String,
    EMAIL:String,
    PASSWORD: String,
}, {collection:'users', timestamps:true });

userSchema.plugin(autoIncrement, { model: 'USER_MODEL', field: 'id' });
mongoose.model('USER_MODEL', userSchema);