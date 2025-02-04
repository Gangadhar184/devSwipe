const express = require('express');
const connectDB = require('./configs/database');
const app = express();




connectDB().then(()=>{
    console.log("database connection established");
    app.listen(7777, ()=>{
        console.log("server is working on this port")
    });
}).catch(()=>{
    console.log("database cannot connect")
})

