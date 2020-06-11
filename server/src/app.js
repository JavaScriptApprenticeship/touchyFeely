'use strict';

// 3rd Party Libraries
import express from 'express';
import cors from 'cors';

// Custom Libraries
import router from './api';

const app = express();

// App level middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use(router);

let server;

module.exports = {
  start: (port) => {
    if(! server) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        console.log(`Server up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
  stop: () => {
    server.close( () => {
      console.log('Server has been stopped');
    });
  },
};