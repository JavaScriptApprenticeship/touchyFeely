'use strict';

require('dotenv').config();

require('babel-register');
require("babel-core/register");
require("babel-polyfill");

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

require('./src/app.js').start(process.env.PORT);