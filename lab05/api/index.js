const express = require('express');
const app = express();
app.use(express.json());

const PORT = 4000;

app.get("/nwd", (req, res) =>{
    
})

app.post("/nwd", (req, res) =>{
    let a = req.body.a;
    let  b = req.body.b;
    while(b!=0)
    {
        let r = a%b;
        a = b;
        b = r;
    }
    res.status(200).json({"nwd": a})
});

app.listen(PORT, ()=>[
    console.log(`Server listening on port ${PORT}`)
]);
