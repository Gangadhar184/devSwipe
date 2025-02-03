const express = require('express');
const app = express();

//we generally write middleware using use(becuase use can handle all requests)
app.use('/admin',(req,res,next)=>{
    console.log("admin auth is getting checked")
    const token = "abc";
    const isAdminAuthorized = token === "abc";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
})

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
