'use strict';
const Redis = require('ioredis');

const dbConnData = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};
const client = new Redis(dbConnData);
const express = require('express');

const app = express();

const PORT = process.env.PGPORT;

app.get('/', (req, res) => {
  try{
    const result = async () => {
      return await client.get("key") 
    };
    const k = result();  
    res.send(k)
  }
  catch(err){
    res.send(err.message);
  }
});

app.post('/:val', (req, res) => {
  try{
    const result = async () => {
      await client.set("key", req.params.val); 
      return req.params.val
    }
    result()
    res.send(req.params.val)
  }
  catch(err){
    res.send(err.message);
  }
});


client.on('connect', ()=> {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

client.on('error', (err) => {
  console.error('Cache is not working correctly: ', err);
  if (err.code === 'ECONNREFUSED') {
    client.quit();
  }
});
