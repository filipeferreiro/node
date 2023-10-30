var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    login:String,
    password:String,
},{collection:'users'})

var Users = mongoose.model('Users',userSchema);

module.exports = Users;