const express = require('express');
const app = express();
const fs= require("fs");


app.use(express.json());

app.get('/nwd', async (req, res) => {
  const result = await client.query("SELECT * FROM nwd");
  return res.send(result.rows)
});

app.post('/nwd', async (req, res) => {

    const a = req.body.a;
    const b = req.body.b;
    const nwd = req.body.nwd;
    const message = {
        toInsert: req.body
    };

    await client.query(`INSERT INTO nwd (a, b, nwd) VALUES (${a}, ${b}, ${nwd})`)
    return res.send(message);
});

app.get('/nwd/result', async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const result = client.query(`SELECT result FROM nwd WHERE a = ${a} AND b = ${b};`)
    return res.send({
        result: result
    });
});

require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password'
};

const { Client } = require('pg');
const client = new Client(dbConnData);
console.log('Connection parameters: ');
console.log(dbConnData);
const q = require("./nwd.sql")
client
  .connect()
  .then(async () => {
    await client.query(q);
    console.log('Connected to PostgreSQL');
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));