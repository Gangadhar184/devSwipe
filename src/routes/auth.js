const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const validator = require('validator');
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
    try {
      //validation of data
      validateSignUpData(req);
  
      const { firstName, lastName, email, password, age, gender, photoUrl, about, skills } = req.body;
  
      //encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
      // console.log(passwordHash);
  
      //create instance to the class which is User Model,(never pass req.body it is badway,goodway is to expicitly)
      const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        age,
        gender,
        photoUrl,
        about,
        skills
  
      });
      // const user = new User(req.body);
  
      await user.save(); //it returns the promise
      res.send("Post request done successfully");
  
    } catch (err) {
      res.status(400).send("Error in saving userdata: " + err.message);
    }
  });
  
authRouter.post("/login", async (req, res) => {

    try {
      const { email, password } = req.body;
  
      if (!validator.isEmail(email)) {
        throw new Error("Invalid");
      }
  
      //for comparing the login details
      const user = await User.findOne({ email: email });
  
      if (!user) {
        throw new Error("Invalid credentials");
      }
  
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
  
        //create a jwt token  (this comes from userSchema model, it is like a helper function)
        const token = await user.getJWT();
        // console.log(token);
  
        //cookies - add token to cookie and send the response to the user
        res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000) });
  
  
        res.send("Login successfull");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("Error in saving userdata: " + err.message);
    }
  });

// authRouter.post("/logout", async (req, res)=>{
//     try{
        
//     }catch(err){
//         res.status(400).send("Something went wrong " + err.message);
//     }
// })
module.exports = authRouter ;

