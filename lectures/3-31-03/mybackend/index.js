const express = require('express');
const config = require('./conf');


const app = express();
const PORT = 8080;

// const {Pool} = require('pg');
// const pgClient = new Pool({
//     user: config.postgresUser,
//     host: config.postgresHost,
//     database: config.postgresDb,
//     password: config.postgresPassword
// })

// pgClient.on("connect", () => console.log('Connected to PG'))
// pgClient.on("error", () => console.log('Cant connect to PG'))
// pgClient
//     .query('CREATE TABLE IF NOT EXIST values (number INT)')
//     .catch(err => console.log(err.message))


app.get("/hello", (req, res) =>{
    res.send("Hello world!")
});

app.listen(PORT, ()=>[
    console.log(`Server listening on port ${PORT}`)
]);
