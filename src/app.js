const express = require('express');
const app = express();

const adminAuth = require("./middlewares");

//we generally write middleware using use(becuase use can handle all requests)
app.use('/admin', adminAuth);

app.get("/admin/getAllData",(req,res)=>{
    //logic
    res.send("all data sent");
})
app.get("/admin/deletUser",(req,res)=>{
    res.send("deleted a user");
})

app.listen(7777, ()=>{
    console.log("server is working on this port")
});
