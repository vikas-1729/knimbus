// requring express
const express = require('express');
//const port = 8000;

const db = require('./config/index');

const app = express();
const startFunction = require('./controller/index');
startFunction.home();
// app.listen(port, function (err) {
//   if (err) {
//     console.log(`error occur ${err}`);
//     return;
//   }
//   console.log(`okk we are connected to port ${port}`);
// });
