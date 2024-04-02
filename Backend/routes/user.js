const express = require("express");
const router = express.Router();
const pool =require("../db");
const bcrypt = require("bcrypt");

const {validateName,validateEmail,validatePassword} = require("../utils/validators")
router.post("/signUp",async(req,res)=>{

    try {
        const {name, email, password, isSeller}= req.body;
        const existingUser = await pool.query("SELECT *FROM signup_users WHERE email=$1 ",[email]);

        if(existingUser)
        {
            return res.status(403).json({err:"user already exist, please do sign in"}); //This status code indicates that the server understood the request but refuses to authorize it.
        }
        if(!validateName(name)){
            return res.status(400).json({err:"Invalid user name:name must be longer than two character and must not include number and special character"})
        }
        if(!validateEmail(email)){
            return res.status(400).json({err:"Invalid email"}); //This status code indicates that the server cannot process the request due to invalid syntax or missing parameters in the client's request.
        }
        if(!validatePassword(password)){
            return res.status(400).json({err:"Invalid password: password must be atleast 8 characters long and must include one uppercase letter, one lowercase latter, one digit, one spacial character "})
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user={
            name,
            email,
            password:hashedpassword,
            isSeller
        }

        const createdUser = await pool.query("INSERT INTO signup_users(name,email,password,isSeller) VALUES($1,$2,$3,$4)",[user.name,user.email,user.password,user.isSeller]);
        return res.status(201).json({message:`welcome ${createdUser.name}!`}); //This status code is typically used to indicate that a new resource has been successfully created as a result of the client's request.
    } catch (error) {
      return res.status(500).send(error); //Internal Server Error
    }
})
module.exports = router;