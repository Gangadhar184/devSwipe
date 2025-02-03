const express = require('express');
const app = express();

const {adminAuth,userAuth} = require('./middlewares/auth');


//we generally write middleware using use(becuase use can handle all requests)
app.use('/admin', adminAuth);

// app.post('/user/login',(req,res)=>{
//     res.send("user logged in successfully");
// })
app.post('/user/login', (req,res)=>{
    res.send("user logged in successfully");
})
app.get('/user/data',userAuth , (req,res)=>{
    res.send("user data sent");
})

app.get("/admin/getAllData",userAuth,(req,res)=>{
    //logic
    res.send("all data sent");
})
app.get("/admin/deletUser",(req,res)=>{
    res.send("deleted a user");
})

app.listen(7777, ()=>{
    console.log("server is working on this port")
});
