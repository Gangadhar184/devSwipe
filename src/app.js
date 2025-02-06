const express = require('express');
const connectDB = require('./configs/database');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

//singup post request (Registering the the new user)

app.post('/signup', async (req, res) => {
    try {
    //validation of data
    validateSignUpData(req);



   
    const {firsName, lastName, email, password} = req.body;
    
     //encrypt the password
    const passwordHash = bcrypt.hash(password, 10);
    console.log(passwordHash);

    //create instance to the class which is User Model,(never pass req.body it is badway,goodway is to expicitly)
    const user = new User({
        firsName, lastName, email, password
    });

    
        await user.save(); //it returns the promise
        res.send("Post request done successfully")
    }
    catch (err) {
        res.status(400).send("Error in saving userdata: " + err.message)
    }
})

//user api to get user email
app.get('/user', async (req, res) => {
    try {
        const users = await User.findOne({ email: req.body.email })
        res.send(users);
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }
})

//feed api - get/feed get all the users from the database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
})

//delete - delete user api
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({ _id: userId });
        res.send(user);
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
})

//Update - patch user api

app.patch('/user/:userId', async (req, res) => {

    // const userId = req.body.userId;
    const userId = req.params?.userId;
    const data = req.body;
    try {

        const allowUpdates = ["about", "gender", "age", "skills", "photoUrl"];
        const isUpdateAllowed = object.keys(data).every((key) => allowUpdates.includes(key));
        if (!isUpdateAllowed) {
            throw new Error("update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("SKills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("User updated successfully");

    } catch (err) {
        res.status(400).send("Something went wrong" + err.message);
    }
})

connectDB().then(() => {
    console.log("database connection established");
    app.listen(7777, () => {
        console.log("server is working on this port")
    });
}).catch(() => {
    console.log("database cannot connect")
})

