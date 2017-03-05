const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'hello',
  });
});
app.use('/location', require('./api/location'));

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
