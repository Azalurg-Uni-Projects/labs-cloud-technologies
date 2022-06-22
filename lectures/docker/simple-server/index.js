'use strict'
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
    res.status(200).send("Hello form Docker!!!");
})

app.listen(PORT, async () => {
    console.log(`Server running on port: ${PORT}`);
})