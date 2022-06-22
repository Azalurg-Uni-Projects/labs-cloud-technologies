const express = require('express');
const redis = require('redis');
const cors = require('cors');

//const client = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST ||" 127.0.0.1");
const client = redis.createClient({ url: 'redis://redis:6379' });

client.on('error', (err) => console.log('Redis Client Error', err));

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (_req,res) => {
  const value  = await client.get('key');

  res.status(200).json({value: value})
});

app.post("/", async (req, res) => {
  const data = req.body
  await client.set('key', data.number);

  res.status(200).json({message : "done"});
})
 
app.listen(PORT, async () => {
   await client.connect();
    console.log(`Server running on PORT ${PORT}`);
});