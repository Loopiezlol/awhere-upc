const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/my_database');
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users/', require('./api/users'));

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
