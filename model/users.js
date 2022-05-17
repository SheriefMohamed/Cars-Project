const mongoose = require('mongoose');
const joi = require('joi');

const UserForm = new mongoose.Schema({
    name:{
        type : String,
        require: true
    },
    email:{
        type : String || Number,
        require: true
    },
    password:{
        type : String,
        require: true
    },
    wallet:{
        type : Number,
        require: true
    }
})

const Users = mongoose.model('Users' , UserForm);

// joi validation againest error
function vlidateAgainestErrors(usrr){
    const schema = {
        name : joi.string().max(255).required(),
        email : joi.string().max(255).email(),
        password : joi.string().max(255).required(),
        wallet : joi.number().min(0).greater(0).required()
    };

    return joi.validate(usrr, schema);
}
exports.validate = vlidateAgainestErrors;
exports.userData = Users; 


