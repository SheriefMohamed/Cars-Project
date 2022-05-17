const {carsData, validate} = require('../model/cars');
const {userData} = require('../model/users');
const fs = require('fs');
const Jwt = require('jsonwebtoken');
const secrete = fs.readFileSync('secret.key');

//Communicate with cars collecion from DB

// get all users 
// exports.getAllUsers = async (req,res,next) => {
//     try{
//         const users = await userData.find();
//         res.json(users)
//      }catch{
//           res.json("error")
//      }
// }

// post a care in market
exports.postSellCar = async (req,res,next) => {
    Jwt.verify(req.token, secrete, async (err, data)=>{
        if(err){
            res.sendStatus(403);
        }else{

            const {error} = validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const cars = new carsData({
                userEmail:JSON.parse(atob(req.token.split('.')[1])).users[0].email,
                newOrUsed:req.body.newOrUsed,
                make:req.body.make,
                model:req.body.model,
                price:req.body.price,
                state:req.body.state
            });
            try{
                const savecars=await cars.save();
                res.json(savecars)
            }
            catch{
                res.json("error")
            }
        }
    })
}

// get all cars in market
exports.getAllCars = async (req,res,next) => {
    try{
        const cars = await carsData.find();
        res.json(cars)
     }catch{
          res.json("error")
     }
}

// Searching for a car with price
exports.postSearchCar = async (req,res,next) => {
    try{
        const start =  req.body.start;
        const end =  req.body.end;
        const neededCar = await carsData.find({ price : { $gt :  start-1, $lt : end+1}});
        res.json(neededCar);
    }catch{
        res.json("error");
    }
}

// buy a car with car Id in body
exports.putBuy = async (req,res,next) => {
    try{
        Jwt.verify(req.token, secrete, async (err, data)=>{
            //check if he has money or no
            const buyer = await userData.find({
                _id: JSON.parse(atob(req.token.split('.')[1])).users[0]._id
            });
            const neededCar = await carsData.find({
                _id : req.body.carId
            });
            
            // res.json(buyer[0].wallet);
            if(buyer[0].wallet >= neededCar[0].price){

                // take money from him
                await userData.updateOne({_id : buyer[0]._id},
                    {$set: {wallet : (buyer[0].wallet-neededCar[0].price)}});

                // make a car is sold
                await carsData.updateOne({_id : req.body.carId},
                    {$set: {price : 0,
                            newOrUsed : "sold"}}
                );

                // confirm it
                res.json('Done !!')
            }
            else{
                res.json("You don't have money");
            }
        })
     }catch{
          res.json("error")
     }
}

