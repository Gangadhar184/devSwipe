const express = require('express');
const bcrypt = require('bcrypt');

const {userAuth} = require('../middlewares/auth');
const {validateEditProfileData} = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
    //validateProfile edit data
        //gmail cannot be edited
        //remaining user details can be edited
    try{
        if(!validateEditProfileData(req)) {
            throw new Error("invalid edit request");
        }

        // this comes from the userAuth middleware
        const loggedInUser = req.user;

        //user edit fields(i mean user should edit there info)
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save()

        //res.send("profile updated successfully");
        res.json({
            message : `${loggedInUser.firstName}, your profile updated successfully`,
            data : loggedInUser
        })
    }
    catch(err){
        res.status(400).send("Error: ", err.message);
    }
})

profileRouter.patch('/profile/password', async (req,res)=>{
    try{
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword) {
            return res.status(400).json({
                error : "Both old and new password are required"
            })

        }

        const loggedInUser = req.user;
        //console.log(loggedInUser);

        //checking if old password matches the stored hashedpassword
        const isMatch = await bcrypt.compare(oldPassword, loggedInUser.password);
        if(!isMatch) {
            return res.status(400).json(
                {
                    error : "Incorrect old password"    
                }
            )
        }

        const salt = await bcrypt.genSalt(10);
        loggedInUser.password = await bcrypt.hash(newPassword, salt);

        await loggedInUser.save();

        res.json({
            message : "Password updated successfully"
        })
        
    }
    catch(err) {
        res.status(500).json({
            error : "Error : " + err.message,
        })
    }
})

module.exports =  profileRouter;
