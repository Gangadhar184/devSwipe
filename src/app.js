const express = require('express');
const app = express();

app.use('/test',(req,res)=>{
    res.send("Luffy is Sungod Nika of this generation");
})

app.use('/zoro',(req,res)=>{
    res.send("Zoro is the king of hell");
})

app.use('/',(req,res)=>{
    res.send("Onepiece is greatest of all time");
})
app.listen(7777, ()=>{
    console.log("server is working on this port")
});
