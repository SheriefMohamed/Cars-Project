const express = require('express');
const router = express.Router();
const registrationController = require('../controller/registrationContoller');
const userTransactionController = require('../controller/userTransactionController');

// signup >> post request
router.post('/signup', registrationController.postSignup);

// //get all users
// router.get('/', registrationController.getAllUsers)

//signin >> post request
router.post('/signin', registrationController.postSignin);

/* User transactions */

// put a car for sale
router.post('/sell',verifytoken ,userTransactionController.postSellCar);

// get all cars
router.get('/allcars', userTransactionController.getAllCars);

// search for car with price
router.post('/searchprice', userTransactionController.postSearchCar);

// buy a car with id = (carId)
router.put('/buy',verifytoken , userTransactionController.putBuy)

//verify token
function verifytoken(req, res, next){
    //format of token => authorization: Bearer <token>
    const bearerheader = req.headers['authorization'];
    if(typeof bearerheader !== 'undefined'){
        //split token
        const bearer = bearerheader.split(' ');
        //get token from array
        const token = bearer[1]
        //set the token
        req.token = token;
        next();
    }else{
        res.sendStatus(403);

    }
}

module.exports = router;