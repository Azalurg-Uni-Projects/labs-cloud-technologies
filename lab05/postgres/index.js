const express = require('express');
const app = express();

app.use(express.json());

app.get('/nwd', async (req, res) => {
  const result = await client.query("SELECT * FROM nwd");
  return res.send(result.rows)
});

app.post('/nwd', async (req, res) => {

    let a = req.body.a;
    let b = req.body.b;
    const a_save = req.body.a;
    const  b_save = req.body.b;

    while(b!=0)
    {
        let r = a%b;
        a = b;
        b = r;
    }

    const message = {
        "a": a_save,
        "b": b_save,
        "result": a
    };
    try{
      await client.query(`INSERT INTO nwd (a, b, result) VALUES (${a_save}, ${b_save}, ${a})`)
      return res.send(message);
    }
    catch(err){
      return res.send(err.mes)
    }
    
});

app.get('/nwd/result', async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    
    const result = await client.query(`SELECT result FROM nwd WHERE a = ${a} AND b = ${b};`);

    return res.send({
        result: result.rows
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

client
  .connect()
  .then( () => {
    console.log('Connected to PostgreSQL');
    client.query(`CREATE TABLE IF NOT EXISTS nwd (
      a INT NOT NULL,
      b INT NOT NULL,
      result INT NOT NULL,
      PRIMARY KEY(a, b)
  );`)
    const port = process.env.PORT || 5000

    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));