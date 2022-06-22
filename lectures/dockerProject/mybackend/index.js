const express = require('express');
const app = express();
const router = express.Router();
const client = require('./config/redisClient');

const { User } = require('./models');
const db = require('./models');

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/hello', (req, res) => {
  res.send('hello there');
});

app.get('/users', async (req, res) => {
  const userId = req.query.id;
  const users = await getOrSetCache(`users?userId=${userId}`, async () => {
    const data = await User.findAll();
    return data;
  });
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await getOrSetCache(`user?userId=${req.params.id}`, async () => {
    const data = await User.findOne({ where: { id: req.params.id } });
    return data;
  });
  res.json(user);
});

app.post('/users', async (req, res) => {
  const result = await User.create({
    name: req.body.name,
    color: req.body.color,
  }).catch((err) => {
    if (err) console.log(err);
  });
  return res.json(result);
});

app.put('/users/:id', async (req, res) => {
  await User.update(
    { name: req.body.name, color: req.body.color },
    { where: { id: req.params.id } }
  );
  const result = await User.findOne({ where: { id: req.params.id } });
  res.send(result);
});

app.delete('/users/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } }).catch((err) => {
    if (err) console.log(err);
  });
  res.send(req.params.id);
});

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    client.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const recievedData = await cb();
      client.setex(key, 300, JSON.stringify(recievedData));
      resolve(recievedData);
    });
  });
}

client.on('error', (err) => {
  console.error('Cache is not working correctly: ', err);
  if (err.code === 'ECONNREFUSED') {
    client.quit();
  }
});

client.on('connect', () => {
  db.sequelize.sync().then((req) => {
    app.listen(8080, () => {
      console.log(`server running`);
    });
  });
});
