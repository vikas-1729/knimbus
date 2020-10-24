// requring express
const express = require('express');
const port = 8000;

const db = require('./config/index');

const app = express();
app.use(require('./router/index'));

app.listen(port, function (err) {
  if (err) {
    console.log(`error occur ${err}`);
    return;
  }
  console.log(`okk we are connected to port ${port}`);
});
