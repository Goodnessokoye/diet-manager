const express = require('express');
require('express-async-errors');
const logger = require('morgan');

const cors = require('cors');
const helmet = require('helmet');

const appRoutes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const app = express();

//set security headers
app.use(helmet());

//enable cors
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use('/api', appRoutes());


app.use(errorHandler);

module.exports = app;
