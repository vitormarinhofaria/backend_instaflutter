require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
  process.env.MONGOCTN,
  {useNewUrlParser: true, useUnifiedTopology: true}
);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

app.use(require('./src/routes'));
app.listen(process.env.PORT);
console.log(`Server Running on port '${process.env.PORT}'`);
