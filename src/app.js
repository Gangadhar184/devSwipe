const express = require('express');
const app = express();

app.get('/user/:userId',(req,res)=>{
    // console.log(req.query);
    console.log(req.params)
    res.send({abc:"abc",xyz:"xyz"});
})
app.listen(7777, ()=>{
    console.log("server is working on this port")
});
