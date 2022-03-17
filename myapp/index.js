const express = require('express');

const app = express();

app.post('/', (req, res) =>{
    res.send("Hello world!")
})

app.listen(8080, ()=>{
    console.log("Hello world");
})