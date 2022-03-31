const express = require('express');
const app = express();

const PORT = 4000;

app.get("/hello", (req, res) =>{
    res.send("Hello world!")
});

app.listen(PORT, ()=>[
    console.log(`Server listening on port ${PORT}`)
]);
