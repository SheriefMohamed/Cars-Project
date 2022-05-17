const express = require('express');
const router = express.Router();
const userTransactionController = require('../controller/userTransactionController');
const adminController = require('../controller/adminController');

// get all users data
router.get('/users', adminController.getAllUsers);

// get all cars data 
router.get('/allcars', userTransactionController.getAllCars);

// update on cars data 
router.put('/updatecar/:carId', adminController.putCarsData);

module.exports = router;