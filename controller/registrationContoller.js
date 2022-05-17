const {userData, validate} = require('../model/users');
const fs = require('fs');
const Jwt = require('jsonwebtoken');
const secrete = fs.readFileSync('secret.key');

//Communicate with users collecion from DB

// Sign up
exports.postSignup = async (req,res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userEmail = req.body.email;
    const checkedEmail = await userData.find({
        email : userEmail
    });
    if(!checkedEmail[0]){
        const users = new userData({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            wallet:req.body.wallet
        });
        try{
            const saveusers=await users.save();
            res.json(saveusers);
        }
        catch{
            res.json("errors")
        }   
    }else{
        res.json('Change the email')
    }
}

// Sign in
exports.postSignin = async (req,res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try{
        const users = await userData.find({
            email : userEmail
        });
        if(users[0].password == userPassword){
            Jwt.sign({users}, secrete, (err, token )=>{
                if(err){
                    res.json({message:"username or pass not correct"})
                }
                res.json({token});
            })
        }else{
            res.json("Wrong password")
        }
     }catch{
          res.json("error")
     }
}
