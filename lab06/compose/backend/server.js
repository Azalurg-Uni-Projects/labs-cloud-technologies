'use strict';

const express = require('express');
const Redis = require("ioredis");

const app = express();
app.use(express.json());

const dbConnData = {
  port: process.env.REDIS_PORT,
  host: 'myredis'
  // host: process.env.REDIS_HOST
};

const client = new Redis(dbConnData);

const PORT = process.env.PGPORT;


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/redis', async (req, res) => {
  try{
   const response = client.get('*')
    res.json(response);
  } catch (err){
    console.log(err.message);
    res.send(err.message)
  }
})

app.post('/redis', async (req, res) =>{
  const key = req.body.key;
  const val = req.body.val;
  try{
    client.set(key, val)
    res.send({key: val})
  }
  catch(err){
    console.log(err.message);
    res.send(err.message)
  }
  
})


client.on('error', err => {
  console.error('Error connecting to Redis', err.message);
});
client.on('connect', () => {
    console.log(`Connected to Redis.`)
    app.listen(PORT, () => {
      console.log('Listening on port ' + PORT);
    });
});