const express = require('express');
const app = express();

let animeData = {
    firstName : "Monkey D",
    lastName : "Luffy",
    age : "19",
    country : "goa kingdom"
}

app.get('/test',(req,res)=>{
    res.send(animeData);
})

app.post('/test',(req,res) => {
    // animeData = req.body; 
    animeData = {
        firstName : "Monkey D",
        lastName : "Luffy",
        age : "19",
        country : "goa kingdom",
        role : "captain"
    }
    res.send({
        message : "anime data created successfully",
        data : animeData
    })
})


//using put we can update all body at a time
app.put('/test',(req,res)=>{
    animeData = {
        firstName : "Roronora Zoro",
        lastName : "zoro",
        age : "21",
        country : "east blue",
        role : "vice-captain"
    };
    res.send({
        message : "anime data replaced successfully",
        data: animeData
    })
})

//we can update individual value using patch
app.patch('/test',(req,res)=>{
    animeData.firstName = "Roronora";
    res.send({
        message :"first name updated successfully",
        data : animeData
    })
})

// app.delete('/test', (req,res)=>{
//     animeData = {
        
//     }
//     res.send({
//         message : "anime data deleted successfully",
//         data : animeData
//     })
// })
app.delete('/test',(req,res)=>{
    if(animeData.role){
        delete animeData.role;
        res.send({
            message : "role property deleted successfully",
            data : animeData
        })
    }
})


// app.patch('/test',(req,res)=>{
//     animeData = { ...animeData, ...req.body};
//     res.send({
//         message : "anime data partially updated successfully",
//         data : animeData
//     })
// });

// app.use('/test',(req,res)=>{
//     res.send("Luffy is Sungod Nika of this generation");
// })

// app.use('/zoro',(req,res)=>{
//     res.send("Zoro is the king of hell");
// })

//use method will match all the http api calls 
app.use('/',(req,res)=>{
    res.send("Onepiece is greatest of all time");
})
app.listen(7777, ()=>{
    console.log("server is working on this port")
});
