const {userData} = require('../model/users');
const {carsData} = require('../model/cars');

// get all users 
exports.getAllUsers = async (req,res,next) => {
        try{const user = await userData.find();
        res.json(user)
        }catch{
            res.json('error');
        }
}

// updatae on cars data 
exports.putCarsData = async( req ,res )=>
{
    try{
        const updCars = await carsData.updateOne({_id : req.params.carId},
            {$set:{ userEmail:req.body.userEmail,
                    newOrUsed:req.body.newOrUsed,
                    make:req.body.make,
                    model:req.body.model,
                    price:req.body.price,
                    state:req.body.state } })
        res.json(updCars)
     }catch(err){
          res.json({message:err})
     }
}