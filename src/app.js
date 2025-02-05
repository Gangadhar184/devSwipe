const express = require('express');
const connectDB = require('./configs/database');
const User = require('./models/user')
const app = express();

app.use(express.json());

//singup post request
app.post('/signup', async (req, res) => {
    //create instance to the class which is User Model

    const user = new User(req.body);
    
    try {
        await user.save(); //it returns the promise
        res.send("Post request done successfully")
    }
    catch (err) {
        res.status(400).send("Error in saving userdata: " + err.message)
    }
})

//feed api - get/feed get all the users from the database
app.get('/feed', async(req,res)=>{
    try{
    const users = await User.find({});
    res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong");
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

