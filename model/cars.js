const mongoose = require('mongoose');
const joi = require('joi');

const CarsForm = new mongoose.Schema({
    userEmail:{
        type : String,
        require: true
    },
    newOrUsed:{
        type : String || Number,
        require: true
    },
    make:{
        type : String,
        require: true
    },
    model:{
        type : String,
        require: true
    },
    // it may take a price or 'sold' if it was taken
    price:{
        type : Number,
        require: true
    },
    state:{
        type : String,
        require: true
    }
})

const CarsFormm = mongoose.model('Cars' , CarsForm);

// joi validation againest error
function vlidateAgainestErrors(usrr){
    const schema = {
        newOrUsed : joi.string().max(255).required(),
        make : joi.string().max(255).required(),
        model : joi.string().max(255).required(),
        price : joi.number().min(0).greater(0).required(),
        state : joi.string().max(255).required()
    };

    return joi.validate(usrr, schema);
}

exports.validate = vlidateAgainestErrors;
exports.carsData = CarsFormm; 